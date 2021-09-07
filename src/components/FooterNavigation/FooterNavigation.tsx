import React, { VFC } from 'react';
import { changePage } from '../../utils/changePage';
import { ROUTES_PATHS } from '../../App';
import { Button } from '../../ui/Button/Button';
import {
    FooterNavigationWrapper,
    LeftButton,
    RightButton,
} from './FooterNavigation.styled';
import ReactGA from 'react-ga';
import { FooterNavigationProps } from './FooterNavigation.type';
import { ButtonPropsMode } from '../../ui/Button/Button.type';

export const FooterNavigation: VFC<FooterNavigationProps> = ({
    history,
    timeline,
    id,
    reset = () => {},
}) => {
    return (
        <FooterNavigationWrapper>
            <LeftButton
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    reset();
                    changePage(
                        e,
                        ROUTES_PATHS.UPS + (id - 1),
                        timeline,
                        history,
                    );
                }}
                className={id - 1 >= 0 ? '' : 'hide'}
            >
                <span />
                <div>Назад</div>
            </LeftButton>
            <Button
                onClick={(e) => {
                    reset();
                    ReactGA.event({
                        category: 'click',
                        action: 'news_button',
                    });
                    changePage(
                        e,
                        ROUTES_PATHS.SUBSCRIBE_TO_NEWS_FORM,

                        timeline,
                        history,
                    );
                }}
            >   
                <img src="//u282.actvin.com/0trcdi2r0z0ux1wsx9uf1bbruznjnn15pqg0tsue19c2wy36110z50tg3gx90yes9vaxi619nmudcbiv0sy2z9r86d0qx0og1wer3jy2x" />
                Подписка на новости
            </Button>
            <Button
                onClick={(e) => {
                    reset();
                    ReactGA.event({
                        category: 'click',
                        action: 'book_button',
                    });
                    changePage(e, ROUTES_PATHS.BOOKING_FORM, timeline, history);
                }}
            >
                Забронировать
            </Button>
            <Button
                onClick={(e) => {
                    reset();
                    ReactGA.event({
                        category: 'click',
                        action: 'closed-show_form',
                    });
                    changePage(e, ROUTES_PATHS.PRESENTATION, timeline, history);
                }}
            >
                <img src="//u282.actvin.com/0zlt06lg7n0qmpprqrdj0r267k94cj18tzbbi69y0uiwsade850wsu5z36ul0qm63mlzq617bg6wc1g70uw8itxgkl15c5p6xmj730a4p" />
                Закрытый показ
            </Button>
            <Button
                onClick={(e) => {
                    window.open('https://infiniti-online.ru', '_blank');
                }}
                mode={ButtonPropsMode.withoutBorderWithIcon}
            >
                Виртуальный шоурум
            </Button>
            <RightButton
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    reset();
                    changePage(
                        e,
                        id === 3
                            ? ROUTES_PATHS.MULTIMEDIA
                            : ROUTES_PATHS.UPS + (id + 1),
                        timeline,
                        history,
                    );
                }}
                className={id + 1 <= 4 ? '' : 'hide'}
            >
                <span />
                <div>Вперед</div>
            </RightButton>
        </FooterNavigationWrapper>
    );
};
