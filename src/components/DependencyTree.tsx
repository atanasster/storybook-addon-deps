import React from 'react';
import { DocsPageWrapper, DocsPage } from '@storybook/components';
import { IDepencency, IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { StoryInput } from '../types';
import { findComponentDependencies } from '../shared/depUtils';

interface DependencyTreeProps {
  map?: IDependenciesMap,
  story?: StoryInput,
}

export const DependencyTree = ({ map = {}, story }: DependencyTreeProps) => {
  const { mapper, maxLevels } = map;
  const [data, setData] = React.useState(undefined);
  const [title, setTitle] = React.useState(undefined);
  const [searchString, setSearchString] = React.useState('');
  const [searchFocusIndex, setSearchFocusIndex] = React.useState(0);
  const [searchFoundCount, setSearchFoundCount] = React.useState(null);


  React.useEffect(() => {
    const dependencyToTree = (level: number, dep: string) => {
      if (dep) {
        const main = (mapper[dep] as unknown) as IDepencency;
        const name = main.contextPath;
        return { 
          id: dep,
          subtitle: (
            <div>
              <div
                style={{
                  marginTop: '5px',
                }}
              >  
                {main.id !== undefined ? main.request : undefined}
              </div>
              <div
                style={{
                  margin: '5px 0',
                  opacity: 0.8,
                }}
              >
                {name}
              </div>  
            </div>  
          ),
          title: main.id === main.name ? (main.id || main.request) : `${main.name} (${main.id})`,
          children: level < maxLevels && Array.isArray(main.dependencies) ? main.dependencies.map(dependency => dependencyToTree(
              level + 1,
              dependency
            )) : undefined,
        }
      }
      return undefined;  
    };
    
    if (mapper && story && story.parameters.component) {
      const module = findComponentDependencies(map, story.parameters.component, story.parameters.dependencies && story.parameters.dependencies.storyDependencies);
      if (module) {
        setTitle(module.contextPath);
        const dependencies = module.dependencies.map(dependency => dependencyToTree(0, dependency));        
        setData(dependencies);
      }  else {
        setData(undefined);
        setTitle(undefined);
      }
    }  
  }, [story, mapper]);
  // Case insensitive search of `node.title`
  const customSearchMethod = ({ node, searchQuery }) =>
    searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

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
        {data ? (
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
              rowHeight={70}
            />
          </> 
        ) : 'No dependencies to display'
        }
      </DocsPage>
    </DocsPageWrapper>  
  )
}