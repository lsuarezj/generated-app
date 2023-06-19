export type ComponentDataProps = {
  'data-test'?: string;
  'data-node-id'?: string;
  'data-node-render-path'?: string;
};

export type ComponentBasicProps = {
  id?: string;
  className?: string;
  title?: string;
  lang?: string;
  translate?: TranslateProp;
  accept?: string;
  maxFileSize?: number;
  rest?: string[];
};

export type TranslateProp = 'yes' | 'no' | undefined;
