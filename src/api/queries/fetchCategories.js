import { DataStore } from '@aws-amplify/datastore';

import { Category } from '../../models';

const fetchCategories = async () => await DataStore.query(Category);

export default fetchCategories;
