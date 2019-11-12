import React from 'react';
import { styled } from '@storybook/theming';
import { DocsPageWrapper, DocsPage, Description } from '@storybook/components';
import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import SortableTree from 'react-sortable-tree';
import '../tree-styles.css';
import { StoryInput } from '../types';
import { getDependenciesProps, IModuleWithStory, mapModuleToStory } from '../shared/depUtils';
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
  if ((!data || data.length === 0) && !error) {
    error = errors.NO_DEPENDENCIES;
  }

  const { mapper, maxLevels } = map || {};
  React.useEffect(() => {
    const dependencyToTree = (level: number, module: IModuleWithStory) => {
        const name = module.contextPath;
        const children = () => {
          if (module.dependencies) {
            const modules = mapModuleToStory(module.dependencies.map(dep => mapper[dep]), storyStore, story.parameters.dependencies);
            if (modules) {
              return modules.map(m => dependencyToTree(level + 1, m));
            }
          }  
          return undefined;
        }
        return { 
          id: module.request,
          subtitle: (
            <>
              <div>
                <LabelSmallLight>  
                  {module.id !== undefined ? module.request : undefined}
                </LabelSmallLight>
              </div>
              <div>
                <LabelLight>
                  {name}
                </LabelLight>
              </div>  
            </>  
          ),
          str: nameAsString(module),
          title: <ModuleName story={module.story} module={module} />,
          children: level < maxLevels ? children() : undefined,
        }
      };
    if (mapper && story && story.parameters.component) {
      const { module, modules} = getDependenciesProps({}, {
        parameters:story.parameters, storyStore,
      }, map);
      if (module) {
        setTitle(module.contextPath);
        const dependencies = modules.map(m => dependencyToTree(0, m));        
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
              isVirtualized={false}
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