import React from "react";
import { FormContainer, GridLayout, SelectField, TextAreaField } from "../assets/styled-components/SlidesformFields";
import {
  FlexContainer,
  InputField,
  StyledText,
} from "../assets/styled-components/global/style";
import { categories } from "../constants";

const SlidesformFields = ({ slide, slideIndex, handleChange }) => {
  // Memoize the handleChange function using useCallback
  const handleInputChange = (e) => {
    handleChange(e, slideIndex);
  };

  return (
    <FlexContainer direction="column" justify="center" align="center" gap="1rem">
      <FormContainer>
        <FormField label="Heading:" name="heading" value={slide.heading} placeholder="Your Heading" handleInputChange={handleInputChange} />
        <FormField label="Description:" type="textarea" name="description" value={slide.description} placeholder="Story Description" handleInputChange={handleInputChange} />
        <FormField label="Image URL:" name="imageUrl" value={slide.imageUrl} placeholder="Add Image URL" handleInputChange={handleInputChange} />
        <FormFieldSelect label="Category:" name="category" value={slide.category} options={categories} handleInputChange={handleInputChange} />
      </FormContainer>
    </FlexContainer>
  );
};

// Reusable form field component
const FormField = ({ label, type, name, value, placeholder, handleInputChange }) => (
  <GridLayout>
    <StyledText fontWeight="600">{label}</StyledText>
    {type === "textarea" ? (
        <TextAreaField
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          rows={4} // Adjust the number of rows as needed
        />
      ) : (
        <InputField
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e)=>handleInputChange(e)}
        />
      )}
  </GridLayout>
);

// Reusable select form field component
const FormFieldSelect = ({ label, name, value, options,handleInputChange }) => (
  <GridLayout>
    <StyledText fontWeight="600">{label}</StyledText>
    <SelectField name={name} value={value} onChange={(e)=>handleInputChange(e)} style={{color: value && "black"}}>
      <option value="">Select Category</option>
      {options.map((category) => (
        <option key={category} value={category} style={{color:"black"}}>
          {category}
        </option>
      ))}
    </SelectField>
  </GridLayout>
);

export default SlidesformFields;
