import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { LoginResponse, PrivateFields } from "~/stores/AuthStore";
import { STRAPI_URL } from "~/stores/CatalogStore";
import ApiStore, { HTTPMethod, IApiStore } from "../ApiStore";
import Cookies from "js-cookie";

export default class AuthStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _identifier: string = '';
    private _email: string = '';
    private _password: string = '';
    private _repeatPassword: string = '';
    private _error: string | null = null;
    private _isLoading: boolean = false;
    private _isAuthenticated: boolean = false;
    private _jwt: string | null = null;

    constructor(token: string | undefined) {

        this._isAuthenticated = !!token;
        this._jwt = token || null;

        makeObservable<AuthStore, PrivateFields>(this, {
            _identifier: observable,
            _email: observable,
            _password: observable,
            _repeatPassword: observable,
            _error: observable,
            _isLoading: observable,
            _isAuthenticated: observable,
            _jwt: observable,

            identifier: computed,
            email: computed,
            password: computed,
            repeatPassword: computed,
            error: computed,
            isLoading: computed,
            isAuthenticated: computed,

            authorize: action.bound,
            register: action.bound,
            logout: action.bound,
            reset: action.bound,
        })
    }

    get identifier() {
        return this._identifier;
    }

    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get repeatPassword() {
        return this._repeatPassword;
    }
    get error() {
        return this._error;
    }
    get isLoading() {
        return this._isLoading;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;;
    }
    get jwt(): string | null {
        return this._jwt;
    }

    setJwt(token: string): void {
        this._jwt = token;
        Cookies.set("JWT", token, { expires: 7 });
    }

    clearJwt(): void {
        this._jwt = null;
        Cookies.remove("JWT");
    }


    setIdentifier(value: string) {
        this._identifier = value;
    }

    setEmail(value: string) {
        this._email = value;
    }

    setPassword(value: string) {
        this._password = value;
    }

    setRepeatPassword(value: string) {
        this._repeatPassword = value;
    }

    setError(message: string) {
        this._error = message;
    }

    setLoading(loading: boolean) {
        this._isLoading = loading;
    }

    async authorize(
    ): Promise<void> {

        this.setLoading(true);
        this.setError("");

        try {
            if (!this.identifier || !this.password) {
                throw new Error("Email and password are required");
            }
            const identifier = this._identifier;
            const password = this._password;

            const response = await this._apiStore.request({
                method: HTTPMethod.POST,
                endpoint: '/auth/local',
                params: {},
                headers: {},
                data: {
                    identifier,
                    password,
                },
            });
            runInAction(() => {
                if (response.status === 200) {
                    const data = response.data as LoginResponse;
                    this.setJwt(data.jwt);
                    this._isAuthenticated = true;
                } else {
                    throw new Error("Login failed");
                }
            })

        } catch (error) {
            this.setError((error as Error).message || "An error occurred during login");
        } finally {
            this.setLoading(false);
        }
    }

    async register(): Promise<void> {
        this.setLoading(true);
        this.setError("");
        try {
            if (!this.identifier || !this.password || !this.email) {
                throw new Error("Username, Email and password are required");
            }

            if (this._password !== this._repeatPassword) {
                throw new Error("Passwords must match");
            }

            const username = this._identifier;
            const email = this._email;
            const password = this._password;

            const response = await this._apiStore.request({
                method: HTTPMethod.POST,
                endpoint: '/auth/local/register',
                params: {},
                headers: {},
                data: {
                    username,
                    email,
                    password,
                },
            });

            runInAction(() => {
                 if (response.status === 200) {
                    const data = response.data as LoginResponse;
                    this.setJwt(data.jwt);
                    this._isAuthenticated = true;
                    return;
                } else {
                    throw new Error("Registration failed");
                }
            })
        } catch (error) {
            this.setError((error as Error).message || "An error occurred during login");
        } finally {
            this.setLoading(false);
        }
    }

    logout(): void {
        this.clearJwt();
        this._isAuthenticated = false;
        this.reset();
    }

    reset(): void {
        this._email = '';
        this._password = '';
        this._repeatPassword = '';
        this._error = null;
        this._isLoading = false;
    }

    destroy(): void {
        this.reset();
    }
};
