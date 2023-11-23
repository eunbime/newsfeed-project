import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // TODO : 로그인 여부가 필요한 컴포넌트에서 사용
    // util에 함수로 빼고, redux로 변경 필요, header 에서 사용
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(true);  // 혹은 user 객체 저장
                console.log("login user", user);
            }
        })
    }, []);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
    };

    const signUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("회원가입 완료", userCredential.user);
            setIsLogin(true);

        } catch (error) {
            console.error(error);
            alert(`회원가입 실패 :${error.code}`);
        }
    };
    const signIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("로그인 완료", userCredential.user);
            setEmail("");
            setPassword("");
            setIsLogin(true);
        } catch (error) {
            // console.error(error);
            console.log(error);
            alert(`로그인 실패 :${error.code}`);
        }
    };
    const logOut = async (event) => {
        event.preventDefault();
        await signOut(auth);
        setIsLogin(false);
    };

    return (
        <div>
            <h2>로그인 페이지</h2>
            {/* TODO : 로그인 되어있으면 로그아웃만 보이게 (모달창 꺼지게) */}
            {isLogin === false ?
                <form>
                    <div>
                        <label>이메일 : </label>
                        <input
                            type="email"
                            value={email}
                            name="email"
                            onChange={onChange}
                            required
                        ></input>
                    </div>
                    <div>
                        <label>비밀번호 : </label>
                        <input
                            type="password"
                            value={password}
                            name="password"
                            onChange={onChange}
                            required
                        ></input>
                    </div>
                    <button onClick={signUp}>회원가입</button>
                    <button onClick={signIn}>로그인</button>
                </form>
                :
                <div>
                    <h1>로그인 완료~!🥂</h1>
                    <button onClick={logOut}>로그아웃</button>
                </div>
            }
        </div>
    )
}

export default Login