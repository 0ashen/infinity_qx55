import {
    BodyRight,
    Description,
    FooterNavigation,
    Header,
    Inner,
    Media,
    Navigation,
    NavigationItem,
    Section,
    Slide,
    Title,
    UpsWrapper,
} from './Ups.styled';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import dataUps from '../../dataUPS.json';
import { Button } from '../../ui/Button/Button';
import Flickity from 'react-flickity-component';

import 'flickity/dist/flickity.min.css';

export const Ups = () => {
    const { id = '0' } = useParams<{ id?: string }>();
    const timeline = gsap.timeline({ paused: true, delay: 0.1 });
    const containerWrapper = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        timeline.to(containerWrapper.current, {
            duration: 0.7,
            opacity: 1,
        });
        timeline.play();
    });
    const sliderRef = useRef<null | Flickity>(null);

    return (
        <UpsWrapper ref={containerWrapper}>
            <Inner>
                <Header>
                    <Section>{dataUps[+id].title}</Section>
                    <Navigation>
                        {dataUps[+id as number].data.map((el, idx) => (
                            <NavigationItem
                                key={idx}
                                onClick={() => {
                                    sliderRef.current!.select(idx);
                                }}
                            >
                                {el.title}
                            </NavigationItem>
                        ))}
                    </Navigation>
                </Header>
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={{
                        initialIndex: 1,
                        prevNextButtons: false,
                        pageDots: false,
                        // draggable: false,
                    }} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                    flickityRef={(ref) => (sliderRef.current = ref)}
                >
                    {dataUps[+id as number].data.map((el, idx) => (
                        <Slide key={idx}>
                            <Media>
                                {'images' in el && (
                                    <Flickity
                                        className={'carousel2'} // default ''
                                        elementType={'div'} // default 'div'
                                        options={{
                                            initialIndex: idx,
                                            pageDots: false,
                                        }} // takes flickity options {}
                                        reloadOnUpdate // default false
                                        static // default false
                                        flickityRef={(ref) =>
                                            (sliderRef.current = ref)
                                        }
                                    >
                                        {el.images.map((el, idx) => {
                                            if (typeof el === 'string') {
                                                return (
                                                    <div
                                                        className="slide"
                                                        key={idx}
                                                    >
                                                        <img src={el} alt="" />
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div
                                                    className="slide"
                                                    key={idx}
                                                >
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src="https://www.youtube.com/embed/Mr-QeAGXL24"
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Flickity>
                                )}
                            </Media>
                            <BodyRight>
                                <Title>{el.title}</Title>
                                <Description>{el.text}</Description>
                                <Button>Записаться на тест-драйв</Button>
                            </BodyRight>
                        </Slide>
                    ))}
                </Flickity>

                <FooterNavigation></FooterNavigation>
            </Inner>
        </UpsWrapper>
    );
};
