import styled from "@emotion/styled";

export const ActivitySectionHeader = styled.div`
    display: flex;
    column-gap: 10px;
    border-bottom: 1px solid silver;
    padding: 20px 0;
`;

export const ActivityInput = styled.input`
    flex-grow: 1;
    padding: 5px 10px;
`;

export const ActivitySelect = styled.select`

`;

export const ActivityWriteBtn = styled.button`
    flex-shrink: 0;
`;

export const ActivityBody = styled.div`
    padding: 50px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const ActivityFooter = styled.div`
    display: flex;
    justify-content: center;
    ${(props)=>props.location === 'left' && 'justify-content:flex-start'}
    ${(props)=>props.location === 'right' && 'justify-content:flex-end'}
`;