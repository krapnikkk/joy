export interface IProperty extends PropertyDescriptor {
    enumerable: boolean | undefined;
    set?: (v: any) => void;
    get?: (v?: any) => void;
}

export interface IEvent {
    type: string;
    data?: {}
}