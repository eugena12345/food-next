export type PrivateFields = '_identifier' | '_email' | '_password' | '_repeatPassword' | '_error' | '_isLoading' | '_isAuthenticated' | '_jwt' ;

export type LoginParams = {
    identifier: string,
    password: string
}

export interface LoginResponse {
    jwt: string,
}
