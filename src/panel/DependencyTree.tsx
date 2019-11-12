import React from 'react';
import { styled } from '@storybook/theming';
import { DocsPageWrapper, DocsPage, Description } from '@storybook/components';
import { IDependency, IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { StoryInput } from '../types';
import { findComponentDependencies } from '../shared/depUtils';
import { dependencyError, errors } from '../shared/getDependencyError';
import { ModuleName, nameAsString } from '../shared/ModuleName';
import { StyledLight } from '../shared/Labels';

export const LabelLight = styled(StyledLight)<{}>(() => ({
  margin: '8px 0',
}));
export const LabelSmallLight = styled(StyledLight)<{}>(() => ({
  marginTop: '8px',
}));

interface DependencyTreeProps {
  story?: StoryInput,
  storyStore?: any,
  map?: IDependenciesMap,
}

export const DependencyTree = ({ story, storyStore, map }: DependencyTreeProps) => {
  const [data, setData] = React.useState(undefined);
  const [title, setTitle] = React.useState(undefined);
  const [searchString, setSearchString] = React.useState('');
  const [searchFocusIndex, setSearchFocusIndex] = React.useState(0);
  const [searchFoundCount, setSearchFoundCount] = React.useState(null);
  let error = dependencyError({
    map,
    component: story && story.parameters.component,
  });
  if (!data && !error) {
    error = errors.NO_DEPENDENCIES;
  }
  const { mapper, maxLevels } = map || {};
  React.useEffect(() => {
    const dependencyToTree = (level: number, dep: string) => {
      if (dep) {
        const main = (mapper[dep] as unknown) as IDependency;
        const name = main.contextPath;
        const storyName = main.name && storyStore
          && Object.keys(storyStore).find(storyname => {
          const parameters = storyStore[storyname].parameters;
          return parameters && parameters.component  && parameters.component.name === main.name;
         });
       const nodeStory = storyName ? storyStore[storyName] : undefined;
 
        return { 
          id: dep,
          subtitle: (
            <>
              <div>
                <LabelSmallLight>  
                  {main.id !== undefined ? main.request : undefined}
                </LabelSmallLight>
              </div>
              <div>
                <LabelLight>
                  {name}
                </LabelLight>
              </div>  
            </>  
          ),
          str: nameAsString(main),
          title: <ModuleName story={nodeStory} module={main} />,
          children: level < maxLevels && Array.isArray(main.dependencies) ? main.dependencies.map(dependency => dependencyToTree(
              level + 1,
              dependency
            )) : undefined,
        }
      }
      return undefined;  
    };
    if (mapper && story && story.parameters.component) {
      const module = findComponentDependencies(map, story.parameters.component, story.parameters.dependencies);
      if (module) {
        setTitle(module.contextPath);
        const dependencies = module.dependencies.map(dependency => dependencyToTree(0, dependency));        
        setData(dependencies);
      }  else {
        setData(undefined);
        setTitle(undefined);
      }
    }  
  }, [story, mapper]);  // Case insensitive search of `node.title`
  const customSearchMethod = ({ node, searchQuery }) =>
    searchQuery &&
      node.str.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

  const selectPrevMatch = () =>
    setSearchFocusIndex(
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1,
    );

  const selectNextMatch = () =>
    setSearchFocusIndex(
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0,
    );
  return (
    <DocsPageWrapper>
      <DocsPage subtitle={title ? title : 'Dependencies'} title={story && story.parameters.component ? story.parameters.component.name : null}>
        {!error ? (
          <>
            <form
              style={{ display: 'inline-block', marginBottom: '20px' }}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              <input
                style={{ fontSize: '1rem' }}
                value={searchString}
                onChange={event =>
                  setSearchString(event.target.value)
                }
                type="search"
                id="search"
                placeholder="type to search"
              />
              <button
                type="button"
                disabled={!searchFoundCount}
                onClick={selectPrevMatch}
              >
                &lt;
              </button>

              <button
                type="submit"
                disabled={!searchFoundCount}
                onClick={selectNextMatch}
              >
                &gt;
              </button>

              <span>
                &nbsp;
                {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                &nbsp;/&nbsp;
                {searchFoundCount || 0}
              </span>
            </form>  
            <SortableTree
              canDrag={false}
              treeData={data}
              searchQuery={searchString}
              searchMethod={customSearchMethod}
              searchFocusOffset={searchFocusIndex}
              onChange={treeData => setData(treeData)}
              searchFinishCallback={(matches) => {
                setSearchFoundCount(matches.length);
                setSearchFocusIndex(matches.length > 0 ? searchFocusIndex % matches.length : 0);
                }
              }
              //
              // This prop only expands the nodes that are seached.
              onlyExpandSearchedNodes
              rowHeight={90}
              innerStyle={{
                height: 'auto'
              }}
            />
          </> 
        ) : <Description markdown={error} />
      }
      </DocsPage>
    </DocsPageWrapper>  
  )
}