import { Handlers } from '$core/generated';
import { foreignHandler } from '$core/handlers';
import { SupportedLanguages, TargetFunction } from '$core/types';

export const ForeignHandler =
  <Language extends SupportedLanguages, Type extends Handlers[Language]>(
    _language: SupportedLanguages,
    handler: Type,
  ) =>
  (
    _target: object,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<TargetFunction<Language, Type>>,
  ): TypedPropertyDescriptor<TargetFunction<Language, Type>> => {
    return {
      ...descriptor,
      value: foreignHandler(handler),
    };
  };
