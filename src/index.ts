// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript';

import type {
  Node, SourceFile, TransformerFactory,
} from 'typescript';

export const unblockModuleDot: TransformerFactory<SourceFile> = (context) => (rootNode) => {
  function visit(node: Node): ts.VisitResult<ts.Node> {
    if (ts.isModuleDeclaration(node)) {
      if (node.name.text !== '.') {
        return node;
      }
      if (node.body == null) {
        return [];
      }
      if (ts.isModuleBlock(node.body)) {
        // eslint-disable-next-line prefer-destructuring
        const body: ts.ModuleBlock = node.body;
        return body.statements;
      }
    }
    return node;
  }
  return ts.visitEachChild(rootNode, visit, context) as SourceFile;
};

function mergeMember(factory: ts.NodeFactory, list: ts.InterfaceDeclaration[]) {
  if (list.length < 2) {
    return list[0];
  }
  const target = list[0];
  const members = list.reduce((prev, curr) => [...prev, ...curr.members], [] as ts.TypeElement[]);
  return factory.updateInterfaceDeclaration(
    target,
    target.modifiers,
    target.name,
    target.typeParameters,
    target.heritageClauses,
    members,
  );
}

export const mergeImport: TransformerFactory<SourceFile> = (context) => (rootNode) => {
  const interfaceMap: Record<string, ts.InterfaceDeclaration[]> = {};
  const others: ts.Statement[] = [];
  rootNode.statements.forEach((stmt) => {
    if (ts.isInterfaceDeclaration(stmt)) {
      const name = stmt.name.text;
      if (interfaceMap[name]) {
        interfaceMap[name].push(stmt);
      } else {
        interfaceMap[name] = [stmt];
      }
    } else {
      others.push(stmt);
    }
  });
  const interfaces = Object.values(interfaceMap).map((it) => mergeMember(context.factory, it));
  return context.factory.updateSourceFile(rootNode, [...interfaces, ...others], true);
};

export function transformString(text: string): string {
  const sourceFile = ts.createSourceFile('', text, ts.ScriptTarget.ESNext);
  const result = ts.transform(sourceFile, [unblockModuleDot, mergeImport]);
  result.dispose();
  return ts.createPrinter().printFile(result.transformed[0]);
}
