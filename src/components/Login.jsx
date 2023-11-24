
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin } from "redux/config/modules/auth";
import { auth } from "../firebase";


function Login({ onModalClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             dispatch(setIsLogin(true));
    //             console.log("login user", user);
    //         }
    //     })
    // }, []);

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
            dispatch(setIsLogin(true));
            onModalClose();
            // TODO: db에 userInfo 객체도 생성 추가

        } catch (error) {
            alert(`회원가입 실패 :${error.code}`); //TODO : (선택) 사유 구분 예외처리
        }
    };
    const signIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("로그인 완료", userCredential.user);
            dispatch(setIsLogin(true));
            onModalClose();
        } catch (error) {
            alert(`로그인 실패 :${error.code}`); //TODO : (선택) 사유 구분 예외처리
        }
    };

    return (
        <div>
            <h2>로그인 페이지</h2>
            {/* TODO : 로그인 되어있으면 로그아웃만 보이게 (모달창 꺼지게) */}
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
        </div>
    )
}

export default Login