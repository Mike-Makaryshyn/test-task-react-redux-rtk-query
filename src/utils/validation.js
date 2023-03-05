import * as Yup from 'yup';
 
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be less than 60 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Invalid phone number')
    .required('Phone is required'),
  position_id: Yup.string().required('Position is required'),
  photo: Yup.mixed()
    .test('fileSize', 'File size must not exceed 5 MB', (value) => {
      if (!value) return true;
      return value.size <= 5000000;
    })
    .test('fileType', 'File must be a jpeg/jpg image', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/jpg'].includes(value.type);
    })
    .test('fileResolution', 'File resolution must be at least 70x70px', async (value) => {
      if (!value) return true;
      const image = await createImageBitmap(value);
      return image.width >= 70 && image.height >= 70;
    }),
});


export default validationSchema;
