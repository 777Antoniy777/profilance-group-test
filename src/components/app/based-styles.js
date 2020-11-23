import styled from "styled-components";
import {ConstStyle} from "./const-styles";

const visuallyHiddenStyle = {
  'position': 'absolute',
  'width': '1px',
  'height': '1px',
  'margin': '-1px',
  'padding': 0,
  'border': 0,
  'opacity': 0,
  'clip': 'rect(0 0 0 0)',
  'overflow': 'hidden',
};

const ListStyle = {
  'margin': 0,
  'padding': 0,
  'list-style': 'none',
};

const BasedSiteWrapper = styled.div`
  width: 90%;
  max-width: ${ConstStyle.SITE_WRAPPER_DT};
  margin-right: auto;
  margin-left: auto;
`;

export {visuallyHiddenStyle, ListStyle, BasedSiteWrapper};
