export interface userregister {
    userName: string;
    name: string;
    email: string;
    phone: string;
    password: string
}

export interface registerconfirm {
    userid: number;
    username: string;
    otptext: string;
}