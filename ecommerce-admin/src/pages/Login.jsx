import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const handleLogin =  async (e) => {
        e.preventDefault();
        const loginId = id.trim();
        if (!loginId || !pw) {
            alert("아이디와 비밀번호를 입력해 주세요.");
            return;
        }

        try {
            const data = await api.post("/login", {
                    userId: id,
                    password: pw
                });
            
            const token = data.headers['access_token'];
            if (token) localStorage.setItem("token", token);
            onLogin();
            navigate("/");
        } catch (err) {
            console.log(err);
            const body = err.response?.data;
            const msg =
                (typeof body === "string" ? body : body?.message ?? body?.error) ||
                "아이디 또는 비밀번호를 확인해 주세요.";
            alert(msg);
        }
    }

    return (
        <div className='login-main-container'>
            <div className='login-flex-container'>
                <div className="login-container">
                    <div>
                        <h1 className="login-title">eBear</h1>
                    </div>
                    <div>
                        <div>
                            <input className="login-input" type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                            <input className="login-input" type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
                            <button className="login-button" onClick={handleLogin}>Login</button>

                            <label className="login-checkbox-label" for="autoLogin">
                                <div>
                                    <input className="login-checkbox" type="checkbox" id="autoLogin" />
                                    <span className="login-checkbox-span"></span>
                                    <span className="login-checkbox-text">자동로그인</span>
                                </div>
                            </label>
                        </div>
                        <div className="login-link-container">
                            <a className="login-link" href="">아이디 찾기</a>
                            <a className="login-link" href="">비밀번호 찾기</a>
                            <a className="login-link" href="">회원가입</a>
                        </div>
                        <div className="login-social-button-container">
                            <div className="login-social-button-item">
                                <a href="#" className="login-social-button"></a>
                                <span className="login-social-button-text">Google</span>
                            </div>
                            <div className="login-social-button-item">
                                <a href="#" className="login-social-button"></a>
                                <span className="login-social-button-text">Kakao</span>
                            </div>
                            <div className="login-social-button-item">
                                <a href="#" className="login-social-button"></a>
                                <span className="login-social-button-text">Naver</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;