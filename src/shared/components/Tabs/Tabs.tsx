import React, { CSSProperties, forwardRef, useEffect } from 'react';

import {
  FormControl,
  TabProps as MaterialTabProps,
  FormControlProps,
  FormControlLabelProps,
  ListTypeMap,
  ExtendButtonBase,
  ButtonBaseTypeMap,
  Typography,
  Tabs as MaterialTabs,
} from '@mui/material';
import Box from '@mui/material/Box';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { ComponentBasicProps, ComponentDataProps } from '../types';

export type TabProps = Omit<MaterialTabProps, 'ref' | 'error'> &
  ComponentDataProps &
  ComponentBasicProps &
  Pick<FormControlProps, 'variant' | 'size'> &
  Pick<FormControlLabelProps, 'label'> & {
    error?: boolean;
    helperText?: React.ReactNode;
    style?: CSSProperties;
    textcolor?: 'inherit' | 'primary' | 'secondary' | undefined;
    scrollButtons: boolean;
    orientation: 'horizontal' | 'vertical' | undefined;
    headersx: string;
    panelsx: string;
    variant: 'scrollable' | undefined;
    centered?: boolean;
    visibleScrollbar?: boolean;
  };

export type EventTargetTab = React.SyntheticEvent & {
  id?: string;
};

export type TabHeader = FormControlLabelProps & {
  props: {
    header?: string;
  };
};

export type ChildTarget = FormControlLabelProps & {
  props: {
    value: string;
    label: string;
    content: string;
    header?: string;
    children?: React.ReactNode;
  };
};

const colorsPalette = {
  primary: '#1976d2',
  secondary: '#6ef1db',
  inherit: '#1976d2',
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function createObjectFromCssString(stringValue: string) {
  const separator = stringValue?.includes(';') ? ';' : ',';
  let finalObject = {};
  if (stringValue) {
    const stringValueArray = stringValue.toString().split(separator);

    for (let i = 0; i < stringValueArray.length; i++) {
      const key = stringValueArray[i].split(':')[0]?.replace(/\s+/g, '');
      const sxValue = stringValueArray[i].split(':')[1]?.replace(/'|\s+/g, '');
      finalObject = {
        ...finalObject,
        [key]: sxValue,
      };
    }

    return finalObject;
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...otherTabPanelProps } = props;

  return (
    <Box
      role="tabpanel"
      hidden={Number(value) !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...otherTabPanelProps}
    >
      {Number(value) === index && (
        <Box sx={{ p: 3 }}>
          <Typography {...otherTabPanelProps}>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export const Tabs = forwardRef<HTMLDivElement, TabProps>(
  (
    {
      disabled,
      label: initLabel,
      value: initialValue,
      'data-test': dataTest,
      'data-node-id': dataNodeID,
      'data-node-render-path': dataRenderPath,
      style,
      id,
      title,
      className,
      lang,
      translate,
      children,
      variant,
      textcolor = 'primary',
      color,
      orientation,
      scrollButtons,
      headersx,
      panelsx,
      onChange,
      centered,
      visibleScrollbar,
      ...otherTabProps
    },
    ref,
  ) => {
    const [colorState, setColorState] = React.useState(colorsPalette.primary);
    let labels = children || Array<unknown>();
    let content = Array<unknown>();
    if (labels.length === undefined && typeof labels === 'object') labels = [labels];

    if (labels.length > 0) {
      content = labels?.map((child, i) => {
        const childy = child as ChildTarget;
        const { value: valueContent, children: valueContentText } = childy.props;
        return ((
          <TabPanel value={initialValue} key={valueContent} index={Number(valueContent)}>
            {valueContentText}
          </TabPanel>
        ) as unknown) as ChildTarget;
      });
    }

    const sxObjectPanel = createObjectFromCssString(panelsx);
    const sxObjectHeader = createObjectFromCssString(headersx);

    useEffect(() => {
      const headerColor = colorsPalette[textcolor];
      setColorState(headerColor);
    }, [textcolor]);

    return (
      <FormControl
        sx={{ typography: 'body1', ...style }}
        className={className}
        ref={ref}
        data-test={dataTest}
        data-node-id={dataNodeID}
        data-node-render-path={dataRenderPath}
        id={id}
        title={title}
        lang={lang}
        translate={translate}
      >
        <Box
          sx={
            orientation === 'vertical'
              ? {
                  flexGrow: 1,
                  bgcolor: 'background.paper',
                  display: 'flex',
                  ...style,
                  ...sxObjectHeader,
                }
              : {
                  borderBottom: 1,
                  borderColor: 'divider',
                  ...style,
                  ...sxObjectHeader,
                }
          }
        >
          <MaterialTabs
            {...(otherTabProps as OverridableComponent<
              ListTypeMap<ExtendButtonBase<ButtonBaseTypeMap<'button'>>>
            >)}
            value={initialValue}
            centered={centered}
            allowScrollButtonsMobile
            scrollButtons={Boolean(scrollButtons)}
            orientation={orientation}
            visibleScrollbar={Boolean(visibleScrollbar)}
            onChange={onChange as (() => void) | undefined}
            variant={variant}
            sx={{
              color: colorState,
              ...style,
              ...sxObjectHeader,
            }}
          >
            {labels}
          </MaterialTabs>
          <Box style={{ ...sxObjectPanel, width: '100%', ...style }} {...otherTabProps}>
            {content}
          </Box>
        </Box>
      </FormControl>
    );
  },
);
