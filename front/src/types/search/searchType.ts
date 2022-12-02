import { FormEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface SearchValue {
  keyword: string;
}

export interface SearchProps {
  display?: string;
  placeholder?: string;
  register: UseFormRegister<SearchValue>;
  onSubmit: (e: FormEvent) => void;
}
