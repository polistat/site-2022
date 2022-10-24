type FixUpPropObject<T> = T extends { notFound: true } ? never : T;
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;
export type FixUpProps<T extends (arg0: any) => any> = (arg0: Parameters<T>[0]) => Promise<FixUpPropObject<UnwrapPromise<ReturnType<T>>>>;
