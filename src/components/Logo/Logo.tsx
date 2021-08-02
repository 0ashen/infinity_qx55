import { GetBack, Inner, LogoWrapper, Slogan } from './Logo.styled';
import React, { forwardRef, Ref } from 'react';
import { LogoProps } from './Logo.type';
import { YMInitializer } from 'react-yandex-metrika';


const Component = (props: LogoProps, ref: Ref<HTMLDivElement>) => {
    return (
        <LogoWrapper ref={ref}>
            <Inner {...props}>
                {props.getBack && (
                    <GetBack onClick={props.getBack.onClick}>
                        <span />
                        <div>{props.getBack.title}</div>
                    </GetBack>
                )}
                <a href="https://infiniti.ru" target="_blank" rel="noreferrer">
                    <img
                        src={require('../../media/images/logo.svg').default}
                        alt="INFINITI logotype"
                        width="125"
                        height="56"
                    />
                </a>
                <div>
                    <YMInitializer accounts={[83536090]}/>
                </div>
                {
                    props.showSlogan && <Slogan>
                        {/* <b>В центре внимания</b> */}
                        <p>INFINITI QX55</p>
                    </Slogan>
                }
            </Inner>
        </LogoWrapper>
    );
};

export const Logo: React.ForwardRefExoticComponent<
    LogoProps & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, LogoProps>(Component);
