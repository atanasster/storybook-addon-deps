export interface StoryInput {
  id: string;
  name: string;
  kind: string;
  children: string[];
  parameters: {
      filename: string;
      options: {
          hierarchyRootSeparator: RegExp;
          hierarchySeparator: RegExp;
          [key: string]: any;
      };
      [parameterName: string]: any;
  };
  isLeaf: boolean;
}

export interface IDependenciesParameters {
  hideEmpty?: boolean;
  withStoriesOnly? : boolean;
}