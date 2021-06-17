import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { commerce } from '../../api';

const CheckoutForm = ({ onFormSubmit, submit, setSubmit, checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const { register, handleSubmit, errors, clearErrors, control } = useForm();

  const countryCode = useWatch({
    control,
    name: 'shippingCountry', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  const stateProvince = useWatch({
    control,
    name: 'shippingStateProvince',
  });
  useEffect(() => {
    if (checkoutToken) {
      commerce.services
        .localeListShippingCountries(checkoutToken.id)
        .then((countries) => {
          setShippingCountries({ ...countries.countries });
        })
        .catch((error) => {
          console.log('There was an error fetching a list of shipping countries', error);
        });
    }
  }, [checkoutToken]);

  useEffect(() => {
    if (countryCode) {
      commerce.services
        .localeListSubdivisions(countryCode)
        .then((subdivisions) => {
          setShippingSubdivisions({ ...subdivisions.subdivisions });
        })
        .catch((error) => {
          console.log('There was an error fetching the subdivisions', error);
        });
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateProvince && checkoutToken) {
      commerce.checkout
        .getShippingOptions(checkoutToken.id, {
          country: countryCode,
          region: stateProvince,
        })
        .then((options) => {
          setShippingOptions([...options]);
        })
        .catch((error) => {
          console.log('There was an error fetching the shipping methods', error);
        });
    }
  }, [countryCode, stateProvince, checkoutToken]);

  useEffect(() => {});
  const onSubmit = (data) => {
    clearErrors();
    onFormSubmit(data);
  };

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit)();
      setSubmit(false);
    }
  }, [submit]);
  return (
    <form>
      <VStack spacing={4} alignItems="start">
        <Heading size="lg">Customer Information</Heading>
        <HStack spacing={8} width="100%">
          <FormControl id="firstName" isInvalid={errors.firstName}>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              name="firstName"
              ref={register({ required: 'Enter your first name' })}
              autocomplete="off"
              placeholder="John"
            />
            <FormErrorMessage>{errors.firstName ? errors.firstName.message : ''}</FormErrorMessage>
          </FormControl>
          <FormControl id="lastName" isInvalid={errors.lastName}>
            <FormLabel>Last name</FormLabel>
            <Input
              type="text"
              name="lastName"
              ref={register({ required: 'Enter your last name' })}
              autocomplete="off"
              placeholder="Wick"
            />
            <FormErrorMessage>{errors.lastName ? errors.lastName.message : ''}</FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl id="email" isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            autocomplete="off"
            placeholder="john.wick@dontkillmydog.com"
            ref={register({
              required: 'Enter a valid email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <FormErrorMessage>{errors.email ? errors.email.message : ''}</FormErrorMessage>
        </FormControl>
        <Divider />
        <Heading size="lg">Shipping details</Heading>
        <FormControl id="shippingName" isInvalid={errors.shippingName}>
          <FormLabel>Full name</FormLabel>
          <Input
            type="text"
            name="shippingName"
            ref={register({ required: 'Enter your full name' })}
            placeholder="John Wick"
            autocomplete="off"
          />
          <FormErrorMessage>{errors.shippingName ? errors.shippingName.message : ''}</FormErrorMessage>
        </FormControl>
        <FormControl id="shippingStreet" isInvalid={errors.shippingStreet}>
          <FormLabel>Shipping adress</FormLabel>
          <Input
            type="text"
            name="shippingStreet"
            ref={register({ required: 'Enter a your shipping address' })}
            autocomplete="off"
            placeholder="Horseshoe Road in Mill Neck"
          />
          <FormErrorMessage>{errors.shippingStreet ? errors.shippingStreet.message : ''}</FormErrorMessage>
        </FormControl>
        <HStack spacing={8} width="100%">
          <FormControl id="shippingCity" isInvalid={errors.shippingCity}>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="shippingCity"
              ref={register({ required: 'Enter your shipping city' })}
              autocomplete="off"
              placeholder="New York"
            />
            <FormErrorMessage>{errors.shippingCity ? errors.shippingCity.message : ''}</FormErrorMessage>
          </FormControl>

          <FormControl id="shippingPostalZipCode" isInvalid={errors.shippingPostalZipCode}>
            <FormLabel>Postal/Zip code</FormLabel>
            <Input
              type="number"
              name="shippingPostalZipCode"
              autocomplete="off"
              placeholder="10002"
              ref={register({ required: 'Enter your postal or zip code' })}
            />
            <FormErrorMessage>
              {errors.shippingPostalZipCode ? errors.shippingPostalZipCode.message : ''}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl id="shippingCountry" isInvalid={errors.shippingCountry}>
          <FormLabel>Country</FormLabel>
          <Select name="shippingCountry" ref={register({ required: 'Select a country' })} placeholder="Select option">
            {Object.keys(shippingCountries).map((country) => (
              <option value={country}>{shippingCountries[country]}</option>
            ))}
          </Select>
          <FormErrorMessage>{errors.shippingCountry ? errors.shippingCountry.message : ''}</FormErrorMessage>
        </FormControl>
        <FormControl id="shippingStateProvince" isInvalid={errors.shippingStateProvince}>
          <FormLabel>State/Province</FormLabel>
          <Select
            name="shippingStateProvince"
            ref={register({ required: 'Select a state/province' })}
            placeholder="Select option"
          >
            {Object.keys(shippingSubdivisions).map((state) => (
              <option value={state}>{shippingSubdivisions[state]}</option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.shippingStateProvince ? errors.shippingStateProvince.message : ''}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="shippingOption" isInvalid={errors.shippingOption}>
          <FormLabel>Shipping method</FormLabel>
          <Select
            name="shippingOption"
            ref={register({ required: 'Select a state/province' })}
            placeholder="Select option"
          >
            {shippingOptions.map((method, index) => {
              return (
                <option
                  className="checkout__select-option"
                  value={method.id}
                  key={index}
                >{`${method.description} - $${method.price.formatted_with_code}`}</option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.shippingStateProvince ? errors.shippingStateProvince.message : ''}
          </FormErrorMessage>
        </FormControl>

        <Divider />

        <Heading size="lg">Payment Information</Heading>
        <FormControl id="cardNum" isInvalid={errors.cardNum}>
          <FormLabel>Credit card number</FormLabel>
          <Input
            type="number"
            name="cardNum"
            autocomplete="off"
            placeholder="4024007103939509"
            ref={register({
              required: 'Enter a valid card number',
              pattern: {
                value: '\b4[0-9]{12}(?:[0-9]{3})?\b',
                message: 'Invalid credit card number',
              },
            })}
          />
          <FormErrorMessage>{errors.cardNum ? errors.cardNum.message : ''}</FormErrorMessage>
        </FormControl>
        <HStack spacing={8} width="100%">
          <FormControl id="expMonth" isInvalid={errors.expMonth}>
            <FormLabel>Month</FormLabel>
            <Input
              type="number"
              name="expMonth"
              autocomplete="off"
              placeholder="01"
              ref={register({
                required: 'Enter your expiry month',
                pattern: {
                  value: '^(0?[1-9]|1[012])$',
                  message: "That's not a valid month number",
                },
              })}
            />
            <FormErrorMessage>{errors.expMonth ? errors.expMonth.message : ''}</FormErrorMessage>
          </FormControl>
          <FormControl id="expYear" isInvalid={errors.expYear}>
            <FormLabel>Year</FormLabel>
            <Input
              type="number"
              name="expYear"
              autocomplete="off"
              placeholder="2025"
              ref={register({
                required: 'Enter your expiry year',
                pattern: {
                  value: '^d{4}$',
                  message: "That's not a valid year",
                },
              })}
            />
            <FormErrorMessage>{errors.expYear ? errors.expYear.message : ''}</FormErrorMessage>
          </FormControl>
          <FormControl id="ccv" isInvalid={errors.ccv}>
            <FormLabel>CCV</FormLabel>
            <Input
              type="number"
              name="ccv"
              autocomplete="off"
              placeholder="847"
              ref={register({
                required: 'Enter a valid CCV number',
                pattern: {
                  value: '^[0-9]{3, 4}$',
                  message: "That's not a valid ccv number",
                },
              })}
            />
            <FormErrorMessage>{errors.ccv ? errors.ccv.message : ''}</FormErrorMessage>
          </FormControl>
        </HStack>
      </VStack>
    </form>
  );
};

export default CheckoutForm;
