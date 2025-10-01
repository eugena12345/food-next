'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./page.module.scss";
import { authStore } from "~/stores/AuthStore";
import { routes } from "~/config/routes.config";
import Button from "~/components/Button";
import Text from '~/components/Text';
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

const LoginPage = () => {
    const router = useRouter()
    const [mode, setMode] = React.useState<AuthMode>("login");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "login") {
            await authStore.authorize();
            if (!authStore.error) {
                router.push(routes.favorite.create());
            }
        } else {
            await authStore.register();
            if (!authStore.error) {
                router.push(routes.favorite.create());
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["container--withMax"]}>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <Text color="accent" tag="h2">{mode === "login" ? "Login" : "Register"}</Text>

                    {authStore.error && <p className={styles.error}>{authStore.error}</p>}

                    <label className={styles.label} htmlFor="identifier">Username</label>
                    <input
                        className={styles.element}
                        id="identifier"
                        name="identifier"
                        type="text"
                        placeholder="type name"
                        value={authStore.identifier}
                        onChange={(e) => authStore.setIdentifier(e.target.value)}
                    />

                    {mode === "register" && (
                        <>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input
                                className={styles.element}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email"
                                value={authStore.email}
                                onChange={(e) => authStore.setEmail(e.target.value)}
                            />
                        </>
                    )}

                    <label className={styles.label} htmlFor="password">Password</label>
                    <input
                        className={styles.element}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="type password"
                        value={authStore.password}
                        onChange={(e) => authStore.setPassword(e.target.value)}
                    />

                    {mode === "register" && (
                        <>
                            <label className={styles.label} htmlFor="repeatPassword">Confirm Password</label>
                            <input
                                className={styles.element}
                                id="repeatPassword"
                                name="repeatPassword"
                                type="password"
                                placeholder="repeat password"
                                value={authStore.repeatPassword}
                                onChange={(e) => authStore.setRepeatPassword(e.target.value)}
                            />
                        </>
                    )}

                    <Button type="submit" disabled={authStore.isLoading}>
                        {authStore.isLoading ? "Processing..." : mode === "login" ? "Login" : "Register"}
                    </Button>

                    <div className={styles.switchMode}>
                        {mode === "login" ? (
                            <p className={styles.message}>
                                Do not have an account?{" "}
                                <button className={styles.linkButton} type="button" onClick={() => setMode("register")}>
                                    Register
                                </button>
                            </p>
                        ) : (
                            <p className={styles.message}>
                                Already have an account?{" "}
                                <button className={styles.linkButton} type="button" onClick={() => setMode("login")}>
                                    Login
                                </button>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default observer(LoginPage);