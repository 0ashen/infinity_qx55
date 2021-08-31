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
                    changePage(
                        e,
                        ROUTES_PATHS.PRESENTATION,
                       timeline,
                        history,
                    );
                }}
            >
               Закрытый показ
            </Button>
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
                Подписка на новости
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
