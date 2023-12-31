import { DataProvider } from 'react-admin';
// import fakeServerFactory from '../fakeServer';

export default () => {
    // The fake servers require to generate data, which can take some time.
    // Here we start the server initialization but we don't wait for it to finish
    const dataProviderPromise = getDataProvider();

    // Instead we return this proxy which may be called immediately by react-admin if the
    // user is already signed-in. In this case, we simply wait for the dataProvider promise
    // to complete before requesting it the data.
    // If the user isn't signed in, we already started the server initialization while they see
    // the login page. By the time they come back to the admin as a signed-in user,
    // the fake server will be initialized.
    const dataProviderWithGeneratedData = new Proxy(defaultDataProvider, {
        get(_, name) {
            return (resource: string, params: any) => {
                return dataProviderPromise.then(dataProvider => {
                    return dataProvider[name.toString()](resource, params);
                });
            };
        },
    });

    return dataProviderWithGeneratedData;
};

const getDataProvider = async (): Promise<DataProvider> => {
    // @ts-expect-error
    return import('./rest').then(provider => provider.default);
};

const defaultDataProvider: DataProvider = {
    // @ts-ignore
    create: () => Promise.resolve({ data: { id: 0 } }),
    // @ts-ignore
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({}),
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    // @ts-ignore
    getOne: () => Promise.resolve({ data: {} }),
    // @ts-ignore
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({}),
};
