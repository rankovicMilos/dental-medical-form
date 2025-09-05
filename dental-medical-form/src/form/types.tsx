// src/form/types.ts

export type LocaleNamespace = "form"; // in case you split namespaces later

export interface RenderContext {
  t: (key: string, options?: Record<string, unknown>) => string;
}
