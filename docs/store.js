import React, { useState, useEffect } from "react";
import { Container, Text, Button, Div, Col, Row, Icon, SideDrawer, Modal, Input } from "atomize";
import "../../docs/app.css";
import { Iconly } from 'react-iconly';
import ProgressBar from "../components/progressbar";
import { useForm } from "react-hook-form";
import StepOne from '../components/goal/StepOne';
import StepTwo from '../components/goal/StepTwo';
import StepThree from '../components/goal/StepThree';
import Final from '../components/goal/Final';
import StepFour from "../components/goal/StepFour";
import StepFive from "../components/goal/StepFive";




function Goal() {

  // States to handle errors in the form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (datal) => {

    // change the status to laoding

    console.log(datal);

    // send data to the API

    const API_PATH = 'https://api.cyanase.com:3000/handler.php';

    // MAKE AN AJAX REQUEST

    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: datal
    })
      .then(resulta => {

        console.log(resulta.result);
      })
      .catch(error => alert(error));
  }
  //states to handle the previous and next buttons
  const [step, setstep] = useState(1);

  //states for form data
  const [formData, setFormData] = useState({


  });



  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };
  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevStep => ({
      ...prevStep,
      [input]: value
    }));
  }

  ///MY POPUP  MODAL

  const MyModal = ({ isOpen, onClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            rounded="0"
            maxW={{ xs: 'auto', md: '40vw' }}
            m={{ t: "5rem" }}
            h="60vh"
        >
            <Icon
                name="Cross"
                pos="absolute"
                top="1rem"
                right="1rem"
                size="20px"
                onClick={onClose}
                cursor="pointer"
            />


<Div m={{ t: "2rem" }} justify="center">
    <Div d="flex" justify="center">
        <Text m={{ t: "1rem" }}
            textSize="heading"
            textColor="#252859"
            textWeight="500">
            Achieve your goals
        </Text>
    </Div>
    <Div d="flex" justify="center">

        <Text
            textAlign="center"
            textSize="subheader"
            textColor="#898989">
            Deposit money to achieve your financial goal
        </Text>
    </Div>
    <Div justify="center">
        <Div d="flex" align="center" justify="center">
            <Input w={{ xs: '10.5rem', md: '20rem' }}
                {...register("amount", { required: true, maxLength: 15 })}
                placeholder="Enter amount" name="goalDeposit" type="text"
                m={{ t: "3rem" }}
                p={{ x: "2.5rem" }}
                prefix={

                    <Iconly
                        className="ivn"
                        name="Wallet"
                        primaryColor={`#252859`}
                        set='bulk'
                        secondaryColor='orange'
                        stroke='bold'
                    />
                }
                disabled={false}
            />
        </Div>

        <Div d="flex" justify="center">
            <Button w="24rem"
                m={{ t: "2rem" }}
               
                
                bg="#252859"
                shadow="3"
                hoverShadow="4"
            >
                Deposit
            </Button>
        </Div>

    </Div>


    {errors.goalDeposit && <p className="text-error">Your first name is required</p>}

</Div>





        </Modal>
    );

}

  const GoalSteps = () => {

    switch (step) {
      // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
      case 1:
        return (


          <StepOne nextStep={nextStep} values={formData} />

        );
      case 2:
        return (


          <StepTwo prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={formData} />

        );
      case 3:
        return (


          <StepThree prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={formData} />

        );
      case 4:
        return (


          <StepFour prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={formData} />

        );
      case 5:
        return (


          <StepFive prevStep={prevStep} nextStep={nextStep} handleFormData={handleInputData} values={formData} />

        );
      // O
      // Only formData is passed as prop to show the final value at form submit
      case 6:
        return (
          <div className="App">
            <Container>
              <Row>
                <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                  <Final prevStep={prevStep} values={formData} />
                </Col>
              </Row>
            </Container>
          </div>
        );

      // default case to show nothing
      default:
        return (
          <div className="App">
          </div>
        );
    }



  }

  /****************************************************** * PROGRESS BAR STATES*****************/
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);

  /////// *******************************************SIDE DRAWER STATE *****************************************

  const GoalDrawer = ({ isOpen, onClose }) => {

    return (
      <SideDrawer isOpen={isOpen} onClose={onClose} w={{ xs: "100vw", md: "50rem" }}>
        <Div onClick={onClose} d="flex" m={{ b: "4rem" }}>
          <Icon size="35px" name="LeftArrowSolid" color={`#252859`} />
        </Div>
        <GoalSteps />

      </SideDrawer>
    );
  };
  // states to show and hide the set goals sidedrawer
  const [showDrawer, setShow] = useState(false);
  //// *****************************TOP UP BUTTON STATE MODAL****************************************************

  // states to show and hide topup wallet modal
  const [showTopUP, setTopUp] = useState(false);
  const [showTopUpGoal, setTopUpGoal] = useState(false);
  const TopupModal = ({ isOpen, onClose }) => {

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        rounded="0"
        maxW="40vw"
        m={{ t: "2rem" }}
        h="80vh"
      >
        <Icon
          name="Cross"
          pos="absolute"
          top="1rem"
          right="1rem"
          size="16px"
          onClick={onClose}
          cursor="pointer"
        />
        <Div m={{ t: "2rem" }} justify="center">
          
          <Div className="toper">

            <Iconly

              name="Wallet"
              primaryColor={`#252859`}
              set='bulk'
              secondaryColor='orange'
              stroke='bold'
            />
          </Div>

          <Text m={{ t: "1rem" }} textSize="subheader" textColor="#252859" textWeight="500">
            Top up your investment wallet
          </Text>
          <Text
            textAlign="center" textColor="#898989"
          >
            Make it easy to choose your investment type by depositing to your wallet
          </Text>
          <form className="myform" onSubmit={handleSubmit(onSubmit)}>
            <Div d="flex" justify="center">
          
              <Input w={{ xs: '80%', md: '20rem' }}
                {...register("topup", { required: true, maxLength: 15 })}
                placeholder="Enter amount" name="topup" type="text"
                m={{ t: "3rem" }}
                p={{ x: "2.5rem" }}
                prefix={

                  <Iconly
                    className="ivn"
                    name="Wallet"
                    primaryColor={`#252859`}
                    set='bulk'
                    secondaryColor='orange'
                    stroke='bold'
                  />
                }
              />
              {errors.topup && <p className="text-error">Enter amount to continue</p>}
              </Div>
              <Div d="flex" justify="center">
              <Button w={{ xs: '80%', md: '20rem' }}
                m={{ t: "2rem", }} className="button2"
                onClick={() =>
                  setTopUp(true)
                }
                bg="warning700"
                shadow="3"
                hoverShadow="4"
              >
                Deposit
              </Button>
            </Div>
          </form>



        </Div>


      </Modal>
    );
  };
  return (
    <>
      <Container>

        <Div m={{ t: "2rem" }} className="cont menu">

          <Row flexWrap="wrap" d="flex" align="center" flexDir="row">

            <Col >
              <Div>
                <Text textSize="subheader" textColor={`#252859`}><b>WALLET</b></Text>
                
                <Div rounded="sm" className="my_card" justify="center" align="center" p={{ y: "2rem", x: "1.25rem" }} bg={`#FDE5C3`}>

                  <Text textSize="subheader">Account balance</Text>
                  <Text textSize="heading">UGX<b>23,900,848</b></Text>

                  <Button m={{ t: "0.5rem" }} className="button2"
                    onClick={() =>
                      setTopUp(true)
                    }
                    bg="warning700"
                    shadow="3"
                    hoverShadow="4"
                  >
                    Top up
                  </Button>
                  <TopupModal
                    isOpen={showTopUP}
                    onClose={() => setTopUp(false)}
                  />
                </Div>
              </Div>
              {/*******************************************************RECENT ACTIVITY********************************************/}
              <Div p={{ x: "0.5rem", y: "0.5rem" }} m={{ t: "1rem", l: "0.5rem" }}>
                <Text className="text_fst"><b>Recent activity</b></Text>
                <Div rounded="md" className="recent_row" m={{ t: "0.5rem" }} p={{ x: "0.5rem", y: "0.5rem" }}>

                  <Row >
                    <Col >
                      <Div m={{ t: "2em" }}>
                        <Iconly

                          name="Wallet"
                          primaryColor={`#252859`}
                          set='bulk'
                          secondaryColor='orange'
                          stroke='bold'
                        />
                      </Div>

                    </Col>
                    <Col >
                      <Div>
                        <Text textSize="subheader" textWeight="500">Deposit</Text>
                        <Text textWeight="500">UGX 300,000</Text>
                        <Text textColor="green">Successful</Text>
                      </Div>

                    </Col>
                    <Col >
                      <Div className="time">
                        <Text textColor="orange" textWeight="500">Yesterday</Text>
                        <Text textWeight="500">2:00 hrs</Text>

                      </Div>

                    </Col>
                  </Row>
                </Div>
                <Div rounded="md" className="recent_row" m={{ t: "0.5rem" }} p={{ x: "0.5rem", y: "0.5rem" }}>
                  <Row >
                    <Col >
                      <Div m={{ t: "2em" }}>
                        <Iconly

                          name="Wallet"
                          primaryColor={`#252859`}
                          set='bulk'
                          secondaryColor='orange'
                          stroke='bold'
                        />
                      </Div>

                    </Col>
                    <Col >
                      <Div>
                        <Text textSize="subheader" textWeight="500">Deposit</Text>
                        <Text textWeight="500">UGX 300,000</Text>
                        <Text textColor="red" >failed</Text>
                      </Div>

                    </Col>
                    <Col >
                      <Div className="time">
                        <Text textColor="orange" textWeight="500">Yesterday</Text>
                        <Text textWeight="500">2:00 hrs</Text>

                      </Div>

                    </Col>
                  </Row>
                </Div>
                <Div rounded="md" className="recent_row" m={{ t: "0.5rem" }} p={{ x: "0.5rem", y: "0.5rem" }}>
                  <Row>
                    <Col >
                      <Div m={{ t: "2em" }}>
                        <Iconly

                          name="Wallet"
                          primaryColor={`#252859`}
                          set='bulk'
                          secondaryColor='orange'
                          stroke='bold'
                        />
                      </Div>

                    </Col>
                    <Col >
                    
                      <Div>
                        <Text textSize="subheader" textWeight="500">Withdraw</Text>
                        <Text textWeight="500">UGX 300,000</Text>
                        <Text textColor="red" >Failed</Text>
                      </Div>

                    </Col>
                    <Col >
                      <Div className="time">
                        <Text textColor="orange" textWeight="500">Yesterday</Text>
                        <Text textWeight="500">2:00 hrs</Text>

                      </Div>

                    </Col>
                  </Row>
                </Div>
                <Div rounded="md" className="recent_row" m={{ t: "0.5rem" }} p={{ x: "0.5rem", y: "0.5rem" }}>
                  <Row>
                    <Col >
                      <Div m={{ t: "2em" }}>
                        <Iconly

                          name="Wallet"
                          primaryColor={`#252859`}
                          set='bulk'
                          secondaryColor='orange'
                          stroke='bold'
                        />
                      </Div>

                    </Col>
                    <Col >
                      <Div>
                        <Text textSize="subheader" textWeight="500">Withdraw</Text>
                        <Text textWeight="500">UGX 300,000</Text>
                        <Text textColor="red" >Failed</Text>
                      </Div>

                    </Col>
                    <Col >
                      <Div className="time">
                        <Text textColor="orange" textWeight="500">Yesterday</Text>
                        <Text textWeight="500">2:00 hrs</Text>

                      </Div>

                    </Col>
                  </Row>
                </Div>
              </Div>
            </Col>
            {/***************************** Goal columns *************************/}
            <Col>
              <Div className="" d="flex">
              <MyModal
                isOpen={showTopUpGoal}
                onClose={() => setTopUpGoal(false)}
            />
                <Text textSize="subheader" textColor={`#252859`}><b>GOALS</b></Text>
              
                  <Button
                    onClick={() =>
                      setShow(true)
                    }
                    h="2rem"
                    w="7.5rem"
                    rounded="md"
                    m={{ l: "20rem", t: "-0.5rem" }}

                    className="button2"
                    bg={`#252859`}


                  >
                    Set goal
                  </Button>
             

                <GoalDrawer
                  isOpen={showDrawer}
                  onClose={() => setShow(false)}
                />
              </Div>
              <Div m={{t:"0.7rem"}} rounded="md" p={{ y: "2rem", x: "1.25rem" }} bg="#f5f5f5">
                <Div d="flex">
                    <Div
                        className="goal-Svg"
                        h="30px" w="30px"
                        m={{ t: "0.5rem" }}
                        rounded="circle" bg="#F6ECDF"
                        p={{ x: "0.5rem", y: "0.5rem" }}>
                        <Iconly
                            primaryColor='#ff9b00'
                            name="AddUser"
                            set='broken'
                            stroke='bold'

                        />
                    </Div>
                    <Div w="100%" p={{ x: "0.5rem", y: "0.5rem" }}>
                        <Text textSize="subheader" textColor="#252859"><b>Build a house</b></Text>
                        <Text textColor="#CDCCCC"><b>Created 3, Aug 1924 </b></Text>
                    </Div>
                    <Div>
                        <Button
                         p={{ x: "2rem", y: "0.5rem" }}
                            onClick={() => {
                               
                                setTopUpGoal(true);
                            }}
                            bg="#ff9b00"
                            rounded="circle"
                            shadow="5"
                        >
                            Deposit
                        </Button>
                    </Div>
                </Div>

                <Div p={{ x: "0.5rem", y: "0.5rem" }}>
                    <Row>
                        <Col>
                            <Text textColor="#252859" textWeight="500">Week 1</Text>
                        </Col>
                        <Col>
                            <Text textColor="#252859" textWeight="500">UGX 200,000</Text>
                        </Col>
                    </Row>
                    {/***************************** Progress bar *************************/}
                    <Div>
                        <ProgressBar bgcolor={"#252859"} completed={completed} />
                    </Div>

                </Div>

            </Div>
            <Div m={{t:"0.7rem"}} rounded="md" p={{ y: "2rem", x: "1.25rem" }} bg="#f5f5f5">
                <Div d="flex">
                    <Div
                        className="goal-Svg"
                        h="30px" w="30px"
                        m={{ t: "0.5rem" }}
                        rounded="circle" bg="#F6ECDF"
                        p={{ x: "0.5rem", y: "0.5rem" }}>
                        <Iconly
                            primaryColor='#ff9b00'
                            name="AddUser"
                            set='broken'
                            stroke='bold'

                        />
                    </Div>
                    <Div w="100%" p={{ x: "0.5rem", y: "0.5rem" }}>
                        <Text textSize="subheader" textColor="#252859"><b>Build a house</b></Text>
                        <Text textColor="#CDCCCC"><b>Created 3, Aug 1924 </b></Text>
                    </Div>
                    <Div>
                        <Button
                         p={{ x: "2rem", y: "0.5rem" }}
                            onClick={() => {
                               
                                setTopUpGoal(true);
                            }}
                            bg="#ff9b00"
                            rounded="circle"
                            shadow="5"
                        >
                            Deposit
                        </Button>
                    </Div>
                </Div>

                <Div p={{ x: "0.5rem", y: "0.5rem" }}>
                    <Row>
                        <Col>
                            <Text textColor="#252859" textWeight="500">Week 1</Text>
                        </Col>
                        <Col>
                            <Text textColor="#252859" textWeight="500">UGX 200,000</Text>
                        </Col>
                    </Row>
                    {/***************************** Progress bar *************************/}
                    <Div>
                        <ProgressBar bgcolor={"#252859"} completed={completed} />
                    </Div>

                </Div>

            </Div>
              <Div
                shadow="4"
                m={{ t: "0.5rem" }}
                rounded="md"
                className="goal-resp" p={{ y: "2rem", x: "1.25rem" }}>
                {/************************************Chat System************************************/}
                <Div d="flex">

                  <Div m={{ t: "0.5rem" }} p={{ x: "0.5rem", y: "0.5rem" }}>
                    <Text className="my-small-text" textColor="fafafa"><b>My chats</b></Text>
                    <Row>
                      <Col>
                        <Div d="flex" align="center" p={{ x: "0.5rem", y: "0.5rem" }}>
                          <img className="sacco_text" src="image/bg.png" />
                          <Div className="sacco_note" p={{ x: "0.5rem", y: "0.5rem" }} d="flex" align="center" w="20-px" h="20px" rounded="circle" bg="blue" textColor="white">
                            8
                          </Div>
                          <img className="sacco_text" src="image/dp.jpg" />
                          <Div className="sacco_note" p={{ x: "0.5rem", y: "0.5rem" }} d="flex" align="center" rounded="circle" bg="blue" textColor="white">
                            8
                          </Div>
                          <img className="sacco_text" src="image/dp.jpg" />
                          <Div className="sacco_note" p={{ x: "0.5rem", y: "0.5rem" }} d="flex" align="center" rounded="circle" bg="blue" textColor="white">
                            8
                          </Div>
                        </Div>
                      </Col>


                    </Row>
                  </Div>

                </Div>



              </Div>
            </Col>

          </Row>


        </Div>

      </Container>
      {/* Resposive home butto0n design */}


    </>



  );
}

export default Goal;
