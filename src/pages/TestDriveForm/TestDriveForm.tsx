import { Caption, Inner, Input, TestDriveFormWrapper, Title } from './TestDriveForm.styled';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../ui/Button/Button';

export const TestDriveForm = () => {
    return (
        <TestDriveFormWrapper>
            <Logo />
            <Inner>
                <Title>Форма записи на тест-драйв</Title>
                <Caption>
                    Может быть интересным эффектом динамичным + текст (короткий,
                    ни о чем)
                </Caption>
                <Input placeholder="Имя"/>
                <Input placeholder="Фамилия"/>
                <Input placeholder="Номер телефона"/>
                <Input placeholder="e-mail"/>
                <Button>Записаться на тест-драйв</Button>
            </Inner>
        </TestDriveFormWrapper>
    );
};
