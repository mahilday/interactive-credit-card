import "./App.css";
import desktopBg from "./assets/desktop_bg.jpg";
import mobileBg from "./assets/mobile_bg.jpg";
import frontCardCircles from "./assets/front_card_circles.svg";
import { useState } from "react";
import { splitCreditCardNumber } from "./utils/helpers";
import backCardEllipses from "./assets/back_card_ellipses.svg";
import backCardRect from "./assets/back_card_rect.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { PatternFormat } from "react-number-format";
import InputField from "./components/Input";
import ReceiptComponent from "./components/ReceiptComponent";

interface CardDetailsType {
  name: string;
  cardNumber: string | null | number;
  month: string;
  year: string;
  cvc: string | null;
}

const FrontCard = (props: Partial<CardDetailsType>) => {
  const { name, cardNumber, month, year } = props;
  return (
    <article className="front_card text-white flex flex-col justify-between p-3 lg:p-8">
      <div>
        <img src={frontCardCircles} alt="circles" className="w-16 md:w-20" />
      </div>
      <section className="grid gap-4 lg:gap-8">
        <div className="text-lg lg:text-3xl">
          <h2 className="tracking-wider">
            {splitCreditCardNumber(
              cardNumber ? String(cardNumber) : "0000000000000000"
            )}
          </h2>
        </div>
        <ul className="flex justify-between uppercase text-xs lg:text-base">
          <li>{name || "Mathilda Imadojiemu"}</li>
          <li>{((month || year) && `${month}/${year}`) || "00/00"}</li>
        </ul>
      </section>
    </article>
  );
};
const BackCard = (props: Partial<CardDetailsType>) => {
  const { cvc } = props;
  return (
    <article className="back_card pt-4 lg:pt-8 space-y-4">
      <div className="">
        <img src={backCardRect} alt="back rectangle" />
      </div>
      <div className="bg-[#ADB5BE] w-10/12 text-xs lg:text-base mx-auto flex justify-end h-8 items-center px-3 text-white tracking-wider">
        <span>{cvc || "000"}</span>
      </div>
      <div className="w-10/12 mx-auto flex justify-center">
        <img src={backCardEllipses} alt="Back info" />
      </div>
    </article>
  );
};

type CardFormProps = {
  handleCardDetails: (data: Partial<CardDetailsType>) => void;
  cardDetails: CardDetailsType;
  handleIsComplete: (isComp: boolean, callback?: () => void) => void;
};

const CardForm = ({
  handleCardDetails,
  cardDetails,
  handleIsComplete,
}: CardFormProps) => {
  const handleInputChange = async (
    setFieldValue: any,
    field: string,
    value: string | number | null
  ) => {
    setFieldValue(field, value);
  };

  return (
    <>
      <Formik
        initialValues={cardDetails}
        validationSchema={Yup.object().shape({
          cardNumber: Yup.number()
            .min(16, "Too short")
            .typeError("Wrong format, numbers only")
            .required("Can't be blank"),
          month: Yup.number()
            .max(99, "Input must be 2 digits")
            .required("Can't be blank"),
          year: Yup.number()
            .max(99, "Input must be 2 digits")
            .required("Can't be blank"),
          name: Yup.string().required("Can't be blank"),
          cvc: Yup.number()
            .required("Can't be blank")
            .typeError("Wrong format, numbers only"),
        })}
        onSubmit={() => {
          handleIsComplete(true);
        }}
      >
        {(props) => (
          <Form>
            <section className="grid gap-5">
              <InputField
                name="name"
                placeholder="e.g Mathilda Sam"
                label="Cardholder Name"
                onError={props.touched.name && props.errors.name}
                onChange={(e) => {
                  handleInputChange(
                    props.setFieldValue,
                    "name",
                    e.target.value
                  );
                  handleCardDetails({ ...props.values, name: e.target.value });
                }}
              />

              <PatternFormat
                name="cardNumber"
                customInput={InputField}
                value={props.values.cardNumber}
                placeholder={`e.g. ${splitCreditCardNumber(
                  "1234567891230000"
                )}`}
                label="Card Number"
                valueIsNumericString
                onError={props.touched.cardNumber && props.errors.cardNumber}
                format="#### #### #### ####"
                onChange={(e) => {
                  handleInputChange(
                    props.setFieldValue,
                    "cardNumber",
                    e.target.value
                  );
                  handleCardDetails({
                    ...props.values,
                    cardNumber: e.target.value,
                  });
                }}
              />

              <article className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full gap-1">
                  <label className="uppercase font-medium">
                    Exp. date (MM/YY)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      name="month"
                      onError={props.touched.month && props.errors.month}
                      placeholder="MM"
                      onChange={(e) => {
                        handleInputChange(
                          props.setFieldValue,
                          "month",
                          e.target.value
                        );
                        handleCardDetails({
                          ...props.values,
                          month: e.target.value,
                        });
                      }}
                    />

                    <InputField
                      name="year"
                      onError={props.touched.year && props.errors.year}
                      placeholder="YY"
                      onChange={(e) => {
                        handleInputChange(
                          props.setFieldValue,
                          "year",
                          e.target.value
                        );
                        handleCardDetails({
                          ...props.values,
                          year: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <InputField
                  name="cvc"
                  onError={props.touched.cvc && props.errors.cvc}
                  placeholder="e.g 123"
                  label="cvc"
                  onChange={(e) => {
                    handleInputChange(
                      props.setFieldValue,
                      "cvc",
                      e.target.value
                    );
                    handleCardDetails({
                      ...props.values,
                      cvc: e.target.value,
                    });
                  }}
                />
              </article>
            </section>
            <button
              className="bg-[#21092F] h-12 flex justify-center items-center w-full rounded-md hover:opacity-90 cursor-pointer text-white font-semibold text-lg mt-10"
              type="submit"
            >
              Confirm
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const App = () => {
  const [cardDetails, setCardDetails] = useState<CardDetailsType>({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleCardDetails = (data: Partial<CardDetailsType>) => {
    setCardDetails((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleIsComplete = (isComp: boolean, callback?: () => void) => {
    setIsComplete(isComp);
    callback?.();
  };

  const resetForm = () => {
    setCardDetails({
      name: "",
      cardNumber: "",
      month: "",
      year: "",
      cvc: "",
    });
  };

  return (
    <>
      <section className="w-screen min-h-screen">
        <div className="absolute -z-10 w-full lg:w-4/12 h-[30vh] lg:h-full">
          <picture>
            <source media="(min-width: 1024px)" srcSet={desktopBg} />
            <img src={mobileBg} alt="background" className="w-full h-full" />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap-8 min-h-screen p-2 lg:grid-cols-2">
          <>
            <div className="lg:ml-28 flex flex-col justify-center items-center lg:gap-10 ">
              <div className="-ml-8 md:-ml-20 lg:-ml-16 -mt-14 lg:mt-0 order-last lg:order-1">
                <FrontCard
                  name={cardDetails.name}
                  month={cardDetails.month}
                  year={cardDetails.year}
                  cardNumber={cardDetails.cardNumber}
                />
              </div>
              <div className="ml-4 sm:ml-16 md:ml-24 lg:ml-28 order-1 lg:order-last">
                <BackCard cvc={cardDetails.cvc} />
              </div>
            </div>
            <div className="w-11/12 md:w-8/12 mx-auto flex items-center">
              {isComplete ? (
                <ReceiptComponent
                  handleIsComplete={() =>
                    handleIsComplete(false, () => resetForm())
                  }
                />
              ) : (
                <CardForm
                  cardDetails={cardDetails}
                  handleCardDetails={handleCardDetails}
                  handleIsComplete={handleIsComplete}
                />
              )}
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default App;
