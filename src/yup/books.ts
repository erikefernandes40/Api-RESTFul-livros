import * as yup from 'yup';

export const yupCreateBookInput = yup.object().shape({
  name: yup.string().required(),
  amount: yup.number().required().positive().integer(),
  imageUrl: yup.string().url(),
});

export const yupUpdateBookAmountInput = yup.object().shape({
  imageUrl: yup.string().url(),
  amount: yup.number().required().positive().integer(),
  name: yup.string().required()
});
