import {StyledForm, Zaglav} from "./MainComponent.style";
import FormReport from "./MainComponentV2";
import TableReports from "../tableReports/TableReports";
const MainComponent = () => {
    return (
        <div>
        <Zaglav>Учет скота</Zaglav>
        <StyledForm>
            <FormReport/>
        </StyledForm>
        <TableReports/>
    </div>
    );
}

export default MainComponent;