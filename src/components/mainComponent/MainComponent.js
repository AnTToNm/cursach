import {StyledForm, StyledButton, StyledTextarea, StyledInput, StyledLabel, InputDiv, Zaglav} from "./MainComponent.style";
const MainComponent = () => {
    return (
        <div>
        <Zaglav>Учет скота</Zaglav>
        <StyledForm>
                <InputDiv>
                        <StyledLabel htmlFor="code">Код животного:</StyledLabel>
                        <StyledInput type="text" id="code" name="code" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="date">Дата: </StyledLabel>
                    <StyledInput type="date" id="date" name="date" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="event">Событие:</StyledLabel>
                    <StyledInput type="text" id="event" name="event" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="animal">Животное: </StyledLabel>
                    <StyledInput type="text" id="animal" name="animal" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="species">Вид:</StyledLabel>
                    <StyledInput type="text" id="species" name="species" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="quantity">Количество:</StyledLabel>
                    <StyledInput type="number" id="quantity" name="quantity" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="unit">Единица измерения:</StyledLabel>
                    <StyledInput type="text" id="unit" name="unit" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="weight">Масса:</StyledLabel>
                    <StyledInput type="number" id="weight" name="weight" required />
                </InputDiv>
                <InputDiv>
                    <StyledLabel htmlFor="note">Примечание:</StyledLabel>
                    <StyledTextarea id="note" name="note"></StyledTextarea>
                </InputDiv>

            <StyledButton type="submit">Сохранить информацию</StyledButton>

        </StyledForm>
    </div>
    );
}

export default MainComponent;