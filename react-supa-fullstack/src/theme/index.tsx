import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const primaryColorCode = '#000'
    return (
        <ConfigProvider
            theme={
                {
                    token: {
                        colorPrimary: primaryColorCode,
                        controlOutline: 'none',
                    }, //used to customize global tokens like colors, fonts, etc.
                    components: {
                        Button: {
                            controlHeight: 45
                        },
                        Input: {
                            controlHeight: 45,
                            colorBorder: 'gray'
                        }
                    } //used to customize component-specific tokens like butt
                }
            }
        >

            {children}
        </ConfigProvider>
    )
}

export default ThemeProvider
