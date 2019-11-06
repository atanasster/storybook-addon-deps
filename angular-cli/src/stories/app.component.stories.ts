import { AppComponent } from '../app/app.component';

export default {
  title: 'App Component',
  component: AppComponent,
};

export const separateTemplates = () => 
({
  component: AppComponent,
  props: {},
});

separateTemplates.story = {
  name: 'Component with separate template',
};