import React from "react";

import LoginImage from "@/assets/login-image.png";
import { Button } from "@/components/main";

const LoginPage: React.FC = () => {
    return (
        <div className="fixed inset-0">
            
            <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full" style={{
                    background: 'linear-gradient(180deg, rgba(15, 9, 21, 0.00) 0%, #0F0915 60.56%)'
                }} />
                <div className="flex justify-center items-center">
                    <img src={LoginImage} alt="Login" />
                </div>
            </div>
            <div 
                className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    width: '921px',
                    height: '431px',
                    borderRadius: '921px',
                    background: 'rgba(0, 183, 79, 0.12)',
                    filter: 'blur(95px)'
                }}
            />
            <div className="fixed top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4 w-full px-10">
                <h1 
                    className="text-[40px]"
                    style={{
                        fontFamily: 'Glazio',
                    }}
                >
                    HypeSwipe
                </h1>
                <p className="text-[26px] text-center text-white w-full">
                    Which artists will climb the ranks and who will fall today?
                </p>
                <Button className="w-full h-[60px] rounded-full mt-12 bg-[#CDFFE3] shadow-[-8px_8px_20px_0px_rgba(0,0,0,0.20)]">
                    <p className="text-xl font-medium">
                        Login
                    </p>
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;