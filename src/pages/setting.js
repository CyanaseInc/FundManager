import { useState, useEffect, useRef } from "react";

import React from "react";
import {
  Div,
  Text, Textarea,
  Container,
  Modal,
  Icon,
  Input,
  Button,
  Notification,
  Image,
} from "atomize";
import "../../docs/app.css";
import { Iconly } from "react-iconly";
import { useForm } from "react-hook-form";
import axios from "axios";
import Topbar from "./top"
function Setting() {
  /// states to show and hide errors
  
  const [myText, SetText] = useState("Add details to change password");
  const [BankText, setBank] = useState(
    "Add your bank details"
  );
  const [myId, setID] = useState();
  const [Bankbankname, setBankbankname] = useState();
  const [Bankbankaccname, setBankbankaccname] = useState();
  const [BankEmail, setBankEmail] = useState();
  const [Bankbanknumber, setBankbanknumber] = useState();
  const [bankname, setbankname] = useState();
  const [bankaccname, setbankaccname] = useState();
  const [Email, setEmail] = useState();
  const [banknumber, setbanknumber] = useState();
  const [Photo, setPhoto] = useState("download.PNG");
  const [verified, setVerified] = useState("Pending");
  const fileInputRef = useRef(null);
  /// Hide and show componets
  const [show, hide] = useState("show");
  const [showButton, hideButton] = useState("");
  ///// upload note
  const [UploadNote, SetUploadNote] = useState(false);

  ////Get user login data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loginData"));


    setEmail(data.email);
    setbankname(data.bankname);
    setbankaccname(data.bankaccname);
    setbanknumber(data.banknumber);
    if (data.photo === "") {
      setPhoto("http://localhost/api/profile_pic/download.PNG");
    } else {
      setPhoto(`http://localhost/api/profile_pic/${data.photo}`);
    }
    setBankEmail(data.kemail);
    setBankbankname(data.kbankname);
    setBankbankaccname(data.kbankaccname);
    setBankbanknumber(data.kbanknumber);
    setVerified(data.verified);
  }, []);

  ///Set user profile picture
  const [File, setFile] = useState("0");
  const [image, setImage] = useState(null);
  const myChange = <Icon color="white" name="Loading2" size="20px" />;
  const myOriginal = "Change";
  const [buttonText, setButtonText] = useState(myOriginal);
  const myUpload = "Upload Image";
  const [uploadText, setUploadText] = useState(myUpload);
  const [uploadTextF, setUploadTextF] = useState("upload profile");
  const [errorColor, setError] = useState("none");
  const handleOpenFileDialog = (event) => {
  event.stopPropagation();
  fileInputRef.current.click();
};

  const handlePicture = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setFile(event.target.files[0])
    reader.onload = (event) => {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };
  const handleUpload = async () => {
    if (File === "0") {
      alert("choose image first!");
    } else {
      setPhoto(image);
      setUploadText(myChange);
      const data = new FormData();
      data.append("file", File);
      data.append("email", Email);

      const API_PATH = "https://fund.cyanase.com/fund/change_dp.php";

      // MAKE AN AJAX REQUEST

      try {
        const response = await axios.post(API_PATH, data);
     
        if (response.data.success === false) {
          setUploadText("Done!");
        } else {
          setUploadText(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  if (verified == 1) {
    setVerified("Completed");
  }

  // handle on change in forms
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  /// When user submits password change
  const onSubmitPassword = (datal) => {
    /// Set the default error back to noramal
    SetText("Add details to continue");

    /// Set the error color back to default
    setError("none");
    // change the status to laoding
    setButtonText(myChange);

    // send data to the API
    const API_PATH = "https://fund.cyanase.com/fund/app_change_password.php";

    // MAKE AN AJAX REQUEST

    axios({
      method: "post",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: { email: Email, old: datal.opassword, new: datal.npassword },
    })
      .then((resulta) => {
        const message = resulta.data.message;
        const stateMe = resulta.data.status;

        if (stateMe == 200) {
          setButtonText(myOriginal);
          SetText(message);
          setError("yes");
          formRef.current.reset();
        } else if (stateMe == 100) {
          setButtonText(myOriginal);
          SetText(message);
          setError("none");
          formRef.current.reset();
        }
      })
      .catch((error) => console.log(error));
  };

  //when user sets Bank account details

  const onSubmitBank = (datal) => {
    /// Set the default error back to noramal
    SetText("  Who should handle your account incase your not here");

    /// Set the error color back to default
    setError("none");
    // change the status to laoding
    setButtonText(myChange);

    // send data to the API
    const API_PATH = "https://fund.cyanase.com/fund/bank.php";

    // MAKE AN AJAX REQUEST

    axios({
      method: "post",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: {
       bankbranch : datal.bankbranch,
        bankname: datal.bankname,
        bankaccname: datal.bankaccname,
        email: Email,
        banknumber: datal.banknumber,
      },
    })
      .then((resulta) => {
        const messagez = resulta.data.message;
        const stateMe = resulta.data.success;
 console.log(resulta.data)
        if (stateMe === "100") {
          setButtonText(myOriginal);
          setBank(messagez);
          setError("none");
        } else{
          setButtonText(myOriginal);
          SetBank(messagez);
          setError("yes");
        }
      })
      .catch((error) => {console.log(error);
        
        setButtonText(myOriginal);
      });
  };
  /// Show POPUP menue button
  const [showTopUP, setTopUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //change Password
  const ChangePassword = () => {
    const formRef = useRef(null);
    return (
      <>
        <form ref={formRef} className="myform" onSubmit={handleSubmit(onSubmitPassword)}>
          <Div d="flex" justify="center" className="topera">
            <Iconly
              name="Lock"
              primaryColor={`#252859`}
              set="bulk"
              secondaryColor="orange"
              stroke="bold"
            />
          </Div>
          <Div>
            <Text
              m={{ t: "1rem" }}
              textAlign="center"
              textColor="#252859"
              textWeight="500"
              textSize="heading"
            >
              Change password
            </Text>
            <Text
              textSize="subheader"
              textAlign="center"
              className={` ${errorColor === "none" ? "dey" : "deye"}`}
            >
              {myText}
            </Text>
          </Div>
          <Div d="flex" justify="center">
            <Input
              w={{ xs: "100%", md: "24rem" }}
              {...register("opassword", { required: true, maxLength: 15 })}
              placeholder="Enter old password"
              name="opassword"
              type="password"
              m={{ t: "3rem" }}
              p={{ x: "2.5rem" }}
              prefix={
                <Iconly
                  className="ivn"
                  name="Password"
                  primaryColor={`#252859`}
                  set="bulk"
                  secondaryColor="orange"
                  stroke="bold"
                />
              }
            />
          </Div>
          <Div d="flex" align="center" justify="center">
            {errors.opassword && (
              <Text textAlign="center" className="text-error">
                Your old password is required
              </Text>
            )}
          </Div>
          <Div d="flex" justify="center">
            <Input
              w={{ xs: "100%", md: "24rem" }}
              {...register("npassword", { required: true, maxLength: 15 })}
              placeholder="Enter new password"
              name="npassword"
              type="password"
              m={{ t: "3rem" }}
              p={{ x: "2.5rem" }}
              prefix={
                <Iconly
                  className="ivn"
                  name="Password"
                  primaryColor={`#252859`}
                  set="bulk"
                  secondaryColor="orange"
                  stroke="bold"
                />
              }
            />
          </Div>
          <Div d="flex" justify="center">
            {errors.npassword && (
              <Text textAlign="center" className="text-error">
                Your new password is required
              </Text>
            )}
          </Div>

          <Div d="flex" justify="center">
            <Input
              w={{ xs: "100%", md: "24rem" }}
              {...register("cpassword", { required: true, maxLength: 15 })}
              placeholder="Enter new password"
              name="cpassword"
              type="password"
              m={{ t: "3rem" }}
              p={{ x: "2.5rem" }}
              prefix={
                <Iconly
                  className="ivn"
                  name="Password"
                  primaryColor={`#252859`}
                  set="bulk"
                  secondaryColor="orange"
                  stroke="bold"
                />
              }
            />
          </Div>
          <Div d="flex" align="center" justify="center">
            {errors.cpassword && (
              <Text textAlign="center" className="text-error">
                Confirm new password
              </Text>
            )}
          </Div>
          <Div m={{ t: "2rem" }} d="flex" align="center" justify="center">
            <Button
              type="submit"
              align="center"
              shadow="3"
              hoverShadow="4"
              bg={`#252859`}
              m={{ t: "1rem" }}
              w={{ xs: "100%", md: "24rem" }}
            >
              {buttonText}
            </Button>
          </Div>
        </form>
      </>
    );
  };
  //Change Bank account details
  const Bank = () => {
    return (
      <>
        <form className="myform" onSubmit={handleSubmit(onSubmitBank)}>
          <Div justify="center">
            <Div d="flex" justify="center" className="topera">
              <Iconly
                name="People"
                primaryColor={`#252859`}
                set="bulk"
                secondaryColor="orange"
                stroke="bold"
              />
            </Div>
            <Div>
              <Text
                m={{ t: "1rem" }}
                textAlign="center"
                textColor="#252859"
                textWeight="500"
              >
                Add Bank account details
              </Text>
              <Text textAlign="center" textColor="#808080">
                {BankText}
              </Text>
            </Div>

            <Div d="flex" justify="center">
              <Input
                w={{ xs: "100%", md: "24rem" }}
                {...register("bankname", { required: true })}
                placeholder="Bank name"
                name="bankname"
                type="text"
                defaultValue={Bankbankname}
                m={{ t: "2rem" }}
                p={{ x: "2.5rem" }}
                prefix={
                  <Iconly
                    className="ivn"
                    name="User"
                    primaryColor={`#252859`}
                    set="bulk"
                    secondaryColor="orange"
                    stroke="bold"
                  />
                }
              />
            </Div>
            <Div d="flex" align="center" justify="center">
              {errors.bankname && (
                <Text textAlign="center" className="text-error">
                  First name is required
                </Text>
              )}
            </Div>
            <Div d="flex" justify="center">
              <Input
                w={{ xs: "100%", md: "24rem" }}
                {...register("bankaccname", { required: true })}
                placeholder="Bank account name"
                name="bankaccname"
                type="text"
                defaultValue={Bankbankaccname}
                m={{ t: "2rem" }}
                p={{ x: "2.5rem" }}
                prefix={
                  <Iconly
                    className="ivn"
                    name="User"
                    primaryColor={`#252859`}
                    set="bulk"
                    secondaryColor="orange"
                    stroke="bold"
                  />
                }
              />
            </Div>
            <Div d="flex" align="center" justify="center">
              {errors.bankaccname && (
                <Text textAlign="center" className="text-error">
                  last name is required
                </Text>
              )}
            </Div>
            <Div d="flex" justify="center">
              <Input
                w={{ xs: "100%", md: "24rem" }}
                {...register("bankbranch", { required: true })}
                placeholder="bank branch"
                name="bankbranch"
                type="text"
                defaultValue={BankEmail}
                m={{ t: "2rem" }}
                p={{ x: "2.5rem" }}
                prefix={
                  <Iconly
                    className="ivn"
                    name="Message"
                    primaryColor={`#252859`}
                    set="bulk"
                    secondaryColor="orange"
                    stroke="bold"
                  />
                }
              />
            </Div>
            <Div d="flex" align="center" justify="center">
              {errors.email && (
                <Text textAlign="center" className="text-error">
                  Email address is required
                </Text>
              )}
            </Div>

            <Div d="flex" justify="center">
              <Input
                w={{ xs: "100%", md: "24rem" }}
                {...register("banknumber", { required: true, maxLength: 15 })}
                placeholder="bank account number"
                name="banknumber"
                type="number"
                defaultValue={Bankbanknumber}
                m={{ t: "2rem" }}
                p={{ x: "2.5rem" }}
                prefix={
                  <Iconly
                    className="ivn"
                    name="Calling"
                    primaryColor={`#252859`}
                    set="bulk"
                    secondaryColor="orange"
                    stroke="bold"
                  />
                }
              />
            </Div>
            <Div d="flex" align="center" justify="center">
              {errors.banknumber && (
                <Text textAlign="center" className="text-error">
                  banknumber number is required
                </Text>
              )}
            </Div>

            <Div d="flex" justify="center">
              <Button
                type="submit"
                align="center"
                shadow="3"
                hoverShadow="4"
                bg={`#252859`}
                m={{ t: "1rem" }}
                w={{ xs: "100%", md: "24rem" }}
              >
                {buttonText}
              </Button>
            </Div>
          </Div>
        </form>
      </>
    );
  };
///handke bio
 
  const AccountDetails = () => {
    //handle company bio
    
    const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (!file) {
      setError('Please select a file.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
setSelectedFile(file);
    // Create a file preview URL
    
  };
    
const handleFileUploader = () => {
  console.log(selectedFile)
    if (selectedFile!==null) {
      const formData = new FormData();
      formData.append('file', selectedFile);
formData.append('email', Email);
setUploadTextF(myChange);
      axios
        .post('https://fund.cyanase.com/fund/company_profile.php', formData)
        .then((response) => {
         console.log(response.data)
          if(response.data.success===100){
          setUploadTextF("Done")
          // Handle the response from the server if needed
        }
        })
        .catch((error) => {
         console.log(error)
          // Handle the error if needed
        });
    }else{
      alert("select a file")
    }
  };
    ///handle bio
    const [text, setText] = useState('');
  const [errorb, setErrorb] = useState('');

  const handlebio = (event) => {
    setText(event.target.value);
  };

  const handleSubmitbio = (event) => {
    event.preventDefault();

    if (text.length > 0 && text.length <= 750) {
      setButtonText(myChange);
      
      // Send data using Axios
      axios
        .post('https://fund.cyanase.com/fund/bio.php', { text, Email })
        .then((response) => {
          // Handle successful response
          console.log(response.data)
if(response.data.success===true){
            alert("Done;");
            setButtonText(myOriginal)
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } else {
      setErrorb('Invalid input. Please check the character limit.');
    }
  };
  //Change account details
    return (
      <>
        <Div>
          <Text textWeight="700">Account Details</Text>
          <Div  d="flex" align="center" justify="center">
            <Div
              style={{
                backgroundImage: `url(${image || Photo})`,
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                backgroundSize: "cover",
              }}
            />
          </Div>

          <input
            type="file" 
            name="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePicture}
          />
          <Div className="uploader" d="flex" justify="center" onClick={handleOpenFileDialog}>
          <Iconly
               name="Camera"
               primaryColor={`black`}
               set="broken"
               secondaryColor="orange"
               stroke="bold"
              />
          </Div>

          <Div d="flex" justify="center" align="center">
            <Button rounded="md" bg="#252859" onClick={handleUpload}>
              {uploadText}
            </Button>
          </Div>

          
          

          <Div rounded="md" p="0.5rem" m={{ t: "0.5rem" }}>

              <Text m={{ t: "0.8rem" }} textWeight="500" textSize="subheader">
               Add fund bio   </Text> 
               <Div
              rounded="md"
              m={{ t: "0.5rem" }}
              p="1rem"
              bg="gray300"
              d="flex"
              justify="center"
            >

              
              <Div m={{ l: "2rem" }}>
              <form onSubmit={handleSubmitbio}>
        
        {errorb && <p>{errorb}</p>}
              <Textarea placeholder="add short bio about your fund"  onChange={handlebio} 
/>
                <Button type ="submit"m={{t:"1rem"}} p="0.5rem"bg="#252859" rounded="md">
                  {buttonText}
                </Button>
                </form>
                
                <div>
                        <Text m={{ t: "0.8rem" }} textWeight="500" textSize="subheader">
               Upload company bio pdf</Text>       
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {error && <div>{error}</div>}
      <br></br>
      <Button m={{t:"1rem"}}
      onClick ={
        handleFileUploader
      }>{uploadTextF}</Button>
    </div>
              </Div>
            </Div>
          </Div>
        </Div>
      </>
    );
  };
  ///Account details settings

  ////SET THE TYPE OF MODAL TO DISPLAY WHEN USER CLICKS CHOOSES A SETINGS OPTIONS
  const [myModal, ChangeModal] = useState("password");

  let DisplayPopup = "";

  if (myModal == "password") {
    DisplayPopup = <ChangePassword />;
  } else if (myModal === "account") {
    DisplayPopup = <AccountDetails />;
  } else if (myModal == "Bank") {
    DisplayPopup = <Bank />;
  }
  ///pop up modals

  const ShowPopup = ({ isOpen, onClose }) => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        rounded="0"
        maxW={{ xs: "auto", md: "50vw" }}
        m={{ t: "2rem" }}
        h="auto"
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

        {DisplayPopup}
      </Modal>
    );
  };


  return(
<>
  <main className=" main-content-side">
        <Topbar />
                <div className="bottom-container">
          <div className="bottom-container__left">
    <div style={{backgroundColor:"#ffffff"}}>
              <div className="header-container">
               
               
              </div>
                  <>
      <Container>
        <ShowPopup isOpen={showTopUP} onClose={() => setTopUp(false)} />
        <Div>
          <Text textSize="heading" m={{ t: "1rem" }} textWeight="500">
            {" "}
            Account Settings
          </Text>
          <Div
            onClick={() => {
              ChangeModal("password");
              setTopUp(true);
            }}
          >
            <Div p={{ y: "0.25rem" }} m={{ t: "1rem" }} className="listings">
              <Iconly
                name="Password"
                primaryColor={`black`}
                set="broken"
                secondaryColor="orange"
                stroke="bold"
              />
              <Text
                textSize={`20px`}
                textColor={`#ff9b00`}
                textWeight="700"
                m={{ l: "0.7rem" }}
              >
                Password
              </Text>
            </Div>
            <Text textColor={`#808080`} textWeight="500" m={{ l: "0.7rem" }}>
              Change user password
            </Text>
          </Div>
        </Div>
        <Div>
          <Div
            onClick={() => {
              ChangeModal("Bank");
              setTopUp(true);
            }}
            p={{ y: "0.25rem" }}
            m={{ t: "1rem" }}
            className="listings"
          >
            <Iconly
              name="User"
              primaryColor={`black`}
              set="broken"
              secondaryColor="orange"
              stroke="bold"
            />
            <Text
              textSize={`20px`}
              textColor={`#ff9b00`}
              textWeight="700"
              m={{ l: "0.7rem" }}
            >
              Bank account details
            </Text>
          </Div>
          <Text textColor={`#808080`} textWeight="500" m={{ l: "0.7rem" }}>
            Where should all your transfer go
          </Text>
        </Div>
        <Div>
          <Div
            onClick={() => {
              ChangeModal("account");
              setTopUp(true);
            }}
            p={{ y: "0.25rem" }}
            m={{ t: "1rem" }}
            className="listings"
          >
            <Iconly
              name="People"
              primaryColor={`black`}
              set="broken"
              secondaryColor="orange"
              stroke="bold"
            />
            <Text
              textSize={`20px`}
              textColor={`#ff9b00`}
              textWeight="700"
              m={{ l: "0.7rem" }}
            >
              Account Details
            </Text>
          </Div>
          <Text textColor={`#808080`} textWeight="500" m={{ l: "0.7rem" }}>
            Check your user bio
          </Text>
        </Div>
      </Container>
    </>
            </div>
            </div>
            </div>
</main>
</>




    )
}

export default Setting;