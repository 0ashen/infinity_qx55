import React, { VFC } from 'react';
import { changePage } from '../../../../utils/changePage';
import { ROUTES_PATHS } from '../../../../App';
import { Button } from '../../../../ui/Button/Button';
import {
    FooterNavigationWrapper,
    LeftButton,
    RightButton,
} from './FooterNavigation.styled';
import { RouteComponentProps } from 'react-router';

export const FooterNavigation: VFC<{
    timeline: gsap.core.Timeline;
    history: RouteComponentProps['history'];
    id: number;
}> = ({ history, timeline, id }) => {
    return (
        <FooterNavigationWrapper>
            <LeftButton
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
                    changePage(
                        e,
                        ROUTES_PATHS.BOOKING_FORM,
                        timeline,
                        history,
                    );
                }}
            >
                Забронировать
            </Button>
            <Button
                onClick={(e) => {
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
                    changePage(
                        e,
                        ROUTES_PATHS.UPS + (id + 1),
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
