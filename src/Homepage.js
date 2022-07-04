import React , {useState,useEffect} from 'react'
import db, { storage } from './Firebase';
import './Homepage.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { resolvePath, useNavigate } from "react-router-dom";
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useParams } from "react-router-dom";
import Axios from 'axios';
import { confirm } from "react-confirm-box";
import { Audio } from  'react-loader-spinner'





function Homepage() {

    var {passeduserid} = useParams();

    const [isloading, setisloading] = useState(false);

    const [isadmin, setisadmin] = useState(false);

    const navigate = useNavigate();

    const [modalimage, setmodalimage] = useState(null);
    const [modalimagetype, setmodalimagetype] = useState("image");

    const [displaycategory, setdisplaycategory] = useState("All");

    const [allcontents, setallcontents] = useState([]);

    const [rawfile, setrawfile] = useState(null);
    const [currentuser, setcurrentuser] = useState(null);
    const [username, setusername] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [tagline, settagline] = useState("");
    const [oldtagline, setoldtagline] = useState("");

    const [currentlyuploading, setcurrentlyuploading] = useState(false);

    const [newcontentcategory, setnewcontentcategory] = useState("Video");
    const [newcontentlogoposiiton, setnewcontentlogoposiiton] = useState("Top Left");
    const [newcontenttitle, setnewcontenttitle] = useState("");

    const [newrawfile, setnewrawfile] = useState(null);
    const [selectednewrawfile, setselectednewrawfile] = useState(null);

    const [contentsloaded, setcontentsloaded] = useState(false);

    const [downloadedfile, setdownloadedfile] = useState(null);

    const [selectedalbumtoopen, setselectedalbumtoopen] = useState(null);


    const [showpositionmodal, setshowpositionmodal] = useState(false);
    const [positionmodalposition, setpositionmodalposition] = useState("TL");

    const [tryingtodownloaditem, settryingtodownloaditem] = useState(null);



    useEffect(() => {


        
        console.log("user is ");
        console.log(passeduserid);
        if (passeduserid) {
            setcurrentuser(passeduserid);
            db.collection('users').doc(passeduserid).get().then(info => {
                if(!info.exists){
                    db.collection('users').doc(passeduserid).set({
                        name : '',
                        logourl : '',
                        noofdownloadsleft : 10,
                        tagline : ''
                    }).then(done => {
                        fetchallcontents();
                    })
                }
                else {
                setusername(info.data().name);
                setSelectedImage(info.data().logourl);
                settagline(info.data().tagline);
                setoldtagline(info.data().tagline);
                setisadmin(info.data().isadmin);
                fetchallcontents();
                }
               }).catch(efd => {
                   console.log(efd);
               })
        } else {
            
        }
        
    }, []);

 


    const customStyles = {
        content: {
          top: '40%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      
      const customStyles2 = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      const customStyles3 = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex : 1030
        },
      };
      const customStyles4 = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      const customStyles5 = {
        content: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          marginRight: '0%',
          transform: 'translate(0%, 0%)',
          zIndex : 1020
        },
      };
      

      let subtitle;
      const [modalIsOpen, setIsOpen] = React.useState(false);
    
      function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const processupload = (e) => {
            if(rawfile == null && oldtagline == tagline) {
                setIsOpen(false);
            }
            else if(rawfile == null) {
                setcurrentlyuploading(true);
                db.collection('users').doc(currentuser).update({
                    tagline : tagline
                }).then(done => {
                    alert("Updated");
                    setIsOpen(false);
                    setcurrentlyuploading(false);
                }).catch(err => {
                    setcurrentlyuploading(false);
                })
            }
            else {
                setcurrentlyuploading(true);
                storage.ref().child('users/'+currentuser+'/').put(rawfile).then((snapshot) => {
                    console.log(snapshot);
                    storage.ref().child('users/'+currentuser+'/').getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        db.collection('users').doc(currentuser).update({
                            logourl : downloadURL,
                            tagline : tagline
                        }).then(done => {
                            alert("Updated");
                            setIsOpen(false);
                            setcurrentlyuploading(false);
                        }).catch(err => {
                            setcurrentlyuploading(false);
                        })
                      }).catch(efg => {
                        setcurrentlyuploading(false);
                      });
                  });
            }

      }


      let subtitle2;
      const [modalIsOpen2, setIsOpen2] = React.useState(false);
    
      function openModal2() {
        setIsOpen2(true);
      }
    
      function afterOpenModal2() {
        // references are now sync'd and can be accessed.
        subtitle2.style.color = '#f00';
      }
    
      function closeModal2() {
        setIsOpen2(false);
      }



      let subtitle3;
      const [modalIsOpen3, setIsOpen3] = React.useState(false);
    
      function openModal3() {
        setIsOpen3(true);
      }
    
      function afterOpenModal3() {
        // references are now sync'd and can be accessed.
        subtitle3.style.color = '#f00';
      }
    
      function closeModal3() {
        setIsOpen3(false);
      }

      let subtitle4;
      const [modalIsOpen4, setIsOpen4] = React.useState(false);
    
      function openModal4() {
        setIsOpen4(true);
      }
    
      function afterOpenModal4() {
        // references are now sync'd and can be accessed.
        subtitle4.style.color = '#f00';
      }
    
      function closeModal4() {
        setIsOpen4(false);
      }


      let subtitle5;
      const [modalIsOpen5, setIsOpen5] = React.useState(false);
      function openModal5() {
        setIsOpen5(true);
      }
    
      function afterOpenModal5() {
        // references are now sync'd and can be accessed.
        subtitle5.style.color = '#f00';
      }
    
      function closeModal5() {
        setIsOpen5(false);
      }

      const processnewupload = () => {

          if(currentuser == null) {
              navigate('/');
              return;
          }
          if(newcontenttitle == "") {
              if(newcontentcategory === "Album") {
                  alert("Please enter Album name");
              }
              else {
                alert("Please enter content title");
              }
          }
          else if(newcontentcategory === "Album") {
            setcurrentlyuploading(true);
            var currentTimeInSeconds=Math.floor(Date.now()/1000);
            var allpromises = [];

            newrawfile.forEach(rawfile => {
                if(rawfile.type.substring(0, 5) == "image") {
                var x = new Promise((resolve,reject) => {
                    storage.ref().child('content/'+currentTimeInSeconds+'/'+rawfile.name).put(rawfile).then((snapshot) => {
                        console.log(snapshot);
                        storage.ref().child('content/'+currentTimeInSeconds+'/'+rawfile.name).getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            resolve(downloadURL);
                          }).catch(efg => {
                            setcurrentlyuploading(false);
                            reject(efg);
                          });
                      }).catch(efg => {
                        setcurrentlyuploading(false);
                        reject(efg);
                      });
                });
                allpromises.push(x);
                }
            })
            Promise.allSettled(allpromises).then((resp => {
                console.log(resp);
                db.collection('content').doc(""+currentTimeInSeconds).set({
                    title : newcontenttitle,
                    logoposiiton : newcontentlogoposiiton,
                    category : newcontentcategory,
                    contenturl : resp,
                    createdon : currentTimeInSeconds
                }).then(done => {
                    alert("Uploaded");
                    setIsOpen2(false);
                    setcurrentlyuploading(false);
                    setselectednewrawfile(null);
                    setnewrawfile(null);
                }).catch(err => {
                    alert(err);
                    setcurrentlyuploading(false);
                })

            }))
          }
          else if(newrawfile.type.substring(0, 5) == "image" || newrawfile.type.substring(0, 5) == "video" || newrawfile.type.substring(12, 15) == "pdf") {
            setcurrentlyuploading(true);
            var currentTimeInSeconds=Math.floor(Date.now()/1000);
            storage.ref().child('content/'+currentTimeInSeconds+'/'+newrawfile.name).put(newrawfile).then((snapshot) => {
                console.log(snapshot);
                storage.ref().child('content/'+currentTimeInSeconds+'/'+newrawfile.name).getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    db.collection('content').doc(""+currentTimeInSeconds).set({
                        title : newcontenttitle,
                        logoposiiton : newcontentlogoposiiton,
                        category : newcontentcategory,
                        contenturl : downloadURL,
                        createdon : currentTimeInSeconds
                    }).then(done => {
                        alert("Uploaded");
                        setIsOpen2(false);
                        setcurrentlyuploading(false);
                        setselectednewrawfile(null);
                        setnewrawfile(null);
                    }).catch(err => {
                        alert(err);
                        setcurrentlyuploading(false);
                    })
                  }).catch(efg => {
                    setcurrentlyuploading(false);
                  });
              });
          }
          else {
              alert("Unsupported File. Only Images and Videos are allowed")
          }
      }


      const fetchallcontents = () => {
          console.log("Content fetch");
        db.collection('content').orderBy('createdon','desc').get().then(allsnaps => {
            var tmp = [];
            allsnaps.docs.map(eachsnap => {
                tmp.push({...eachsnap.data(), id : eachsnap.id});
            })
            setallcontents(tmp);
            console.log(tmp);
            setcontentsloaded(true);
        })
      }


      const finalisedownload = () => {
        console.log(tryingtodownloaditem);
        if(tryingtodownloaditem.type == "all") {
            
            tryingtodownloaditem.contenturl.forEach(async (url) => {
                console.log("Function passing ",url.value);
                await downloadImage(url.value);
            });
        }
        else if(tryingtodownloaditem.type == "pdf") {
            console.log(tryingtodownloaditem.contenturl);
            downloadpdf(tryingtodownloaditem.id);
        }
        else if(tryingtodownloaditem.type == "image") {
            console.log("Function passing ",tryingtodownloaditem.contenturl);
            downloadImage(tryingtodownloaditem.contenturl);
        }
        else {
            console.log(tryingtodownloaditem.contenturl);
            downloadVideo(tryingtodownloaditem.id);
        }
    }

      const downloadpdf = async (id) => {
        var fm = allcontents.filter(df => df.id == id);
        if(fm.length > 0) {
            var pdfurl = fm[0].contenturl;
            var watermarklogourl = selectedImage;
            var watermarktext = tagline;

            setisloading(true);
            var paramobj = {
                imageUrl: watermarklogourl,
				pdfUrl: pdfurl,
                waterMarkText: watermarktext,
                wmPosition: positionmodalposition
            }
            const responseType = {
				responseType: 'blob',
			};
            console.log(paramobj);
            const res = await Axios.post(`http://3.109.124.99:3001/api/v1/watermark-pdf`,paramobj,responseType);
            setisloading(false);
			if (res) {
				const data = new Blob([res.data]);
				const url = window.URL.createObjectURL(data);
				const tempLink = document.createElement('a');
				tempLink.href = url;
				tempLink.setAttribute('download', 'output.pdf');
				tempLink.click();
			}
        }
      }

      const downloadVideo = async (id) => {
        var fm = allcontents.filter(df => df.id == id);
        if(fm.length > 0) {
            var videourl = fm[0].contenturl;
            var watermarklogourl = selectedImage;
            console.log(videourl+" "+watermarklogourl);
            setisloading(true);
            const body = {
				imageUrl: watermarklogourl,
				videoUrl: videourl,
				waterMarkText: tagline,
				wmPosition: positionmodalposition
			};

			const responseType = {
				responseType: 'blob',
			};
            const res = await Axios.post(
				`http://3.109.124.99:3001/api/v1/watermark-video`,
                body,
                responseType
            );
            setisloading(false);

			if (res) {
				const data = new Blob([res.data]);
				const url = window.URL.createObjectURL(data);
				const tempLink = document.createElement('a');
				tempLink.href = url;
				tempLink.setAttribute('download', 'output.mp4');
				tempLink.click();
			}

        }
      }


      const downloadImage = async (imageurl) => {

            var watermarklogourl = selectedImage;
        
            console.log("Downloading");
            setisloading(true);
            const body = {
				imageUrl: imageurl,
				wmImageUrl: watermarklogourl,
				waterMarkText: tagline,
				wmPosition: positionmodalposition
			};
            console.log(body);
			const responseType = {
				responseType: 'blob',
			};
            const res = await Axios.post(
				`http://3.109.124.99:3001/api/v1/watermark-image`,body,responseType
            );
            setisloading(false);
			if (res) {
				const data = new Blob([res.data]);
				console.log(data);
				const url = window.URL.createObjectURL(data);
				const tempLink = document.createElement('a');
				tempLink.href = url;
				tempLink.setAttribute('download', 'output.png');
				tempLink.click();
			}
      }

      function doanloadalltapped()
      {
        db.collection('users').doc(currentuser).get().then(fg => {
            if(fg.data().noofdownloadsleft > selectedalbumtoopen.contenturl.length) {
                console.log("Downloads are : ");
                console.log(selectedalbumtoopen.contenturl);
                settryingtodownloaditem({...selectedalbumtoopen,type : "all"});
                setshowpositionmodal(true);
                
            }
            else {
                setIsOpen5(false);
                setIsOpen4(true);
            }
        })
      }


    function downloadrequested(item,type)  {
        console.log("Item is ");
        console.log(item);
        db.collection('users').doc(currentuser).get().then(fg => {
            if(fg.data().noofdownloadsleft > 0) {
                settryingtodownloaditem({...item,type : type});
                setshowpositionmodal(true);
                // if(type == "pdf") {
                //     downloadpdf(id);
                // }   
                // else if(type == "video") {
                //     downloadVideo(id);
                // }
                // else {
                // var url = "https://us-central1-dynamicmediatools-55686.cloudfunctions.net/customimage?userid="+currentuser+"&mediaid="+id+"&position=northeast";
                // console.log(url);
                // window.open(
                //     url,
                //     '_blank' // <- This is what makes it open in a new window.
                //   );
                // Axios.get(url,{responseType: 'blob'}).then(response => {
                //     const reader = new FileReader();
                //     const thumbnail =  blobToDataURL(response);
                //     Promise.resolve(thumbnail).then(yooo => {
                //         console.log("All done");
                //         console.log(yooo);
                //         setdownloadedfile(yooo);
                //     }).catch(errrr => {

                //     })
                    
                  
                // }).catch(err => {
                //     console.log(err);
                // })
                // }
            }
            else {
                setIsOpen4(true);
            }
        })
      }

      async function blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Result");
                console.log(reader.result);
                resolve(reader.result);
            };
            reader.onerror = () => reject(reader.error);
            reader.onabort = () => reject(new Error("Read aborted"));
            reader.readAsDataURL(blob);
        });
    }


    const openalbum = (album) => {
        setnewcontentcategory("Album");
        console.log(album);
        setselectedalbumtoopen(album);
        setIsOpen5(true);
    }



    const uploadexistingalbum = () => {
        var currentTimeInSeconds=Math.floor(Date.now()/1000);
        var allpromises = [];
        if(newrawfile && newrawfile.length > 0) {
        setisloading(true);
        }
        else {
            alert("Please select any image file before uploading");
            return;
        }
        newrawfile.forEach(rawfile => {
            if(rawfile.type.substring(0, 5) == "image") {
            var x = new Promise((resolve,reject) => {
                storage.ref().child('content/'+currentTimeInSeconds+'/'+rawfile.name).put(rawfile).then((snapshot) => {
                    console.log(snapshot);
                    storage.ref().child('content/'+currentTimeInSeconds+'/'+rawfile.name).getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                      }).catch(efg => {
                        setcurrentlyuploading(false);
                        reject(efg);
                      });
                  }).catch(efg => {
                    setcurrentlyuploading(false);
                    reject(efg);
                  });
            });
            allpromises.push(x);
            }
        })
        Promise.allSettled(allpromises).then((resp => {
            console.log(resp);
            db.collection('content').doc(selectedalbumtoopen.id).get().then(contentdata => {
                var existingarray = contentdata.data().contenturl;
                resp.forEach(eachitem => {
                    existingarray.push(eachitem);
                })
                db.collection('content').doc(selectedalbumtoopen.id).update({
                    contenturl : existingarray
                }).then(done => {
                    alert("Uploaded");
                    setIsOpen5(false);
                    setcurrentlyuploading(false);
                    setselectednewrawfile(null);
                    setnewrawfile(null);
                    fetchallcontents();
                    setisloading(false);
                }).catch(err => {
                    alert(err);
                    setcurrentlyuploading(false);
                    setisloading(false);
                })
            }).catch(err => {
                alert(err);
                setcurrentlyuploading(false);
                setisloading(false);
            })


        }))
    }

    const deleteexistingalbum = async () => {
        const result = await confirm("Are you sure you want to delete this album?");
        if (result) {
            db.collection('content').doc(selectedalbumtoopen.id).delete().then(done => {
                alert("Album Deleted");
                setIsOpen5(false);
                fetchallcontents();
            })
        }
    }

    const deleterequested = async (mediaid) => {
        const result = await confirm("Are you sure you want to delete this media?");
        if (result) {
            db.collection('content').where('contenturl','==',mediaid).get().then(contdata => {
                contdata.forEach(function(doc) {
                    doc.ref.delete().then(isit => {
                        alert("Media Deleted");
                        fetchallcontents();
                    });
                  });
            })
        }
    }

    const deletealbummediarequested = async (mediaid) => {
        const result = await confirm("Are you sure you want to delete this media?");
        if (result) {
            db.collection('content').doc(selectedalbumtoopen.id).get().then(contdata => {
                var conturl = contdata.data().contenturl;
                var copydata = conturl.filter(mk => mk.value !== mediaid);
                db.collection('content').doc(selectedalbumtoopen.id).update({
                    contenturl : copydata
                }).then(df => {
                    alert("Media Deleted");
                    setIsOpen5(false);
                    fetchallcontents();
                })
            })
        }
    }

      const logouttapped = () => {
          navigate('/');
      }
    return (
        <div className='homepage'>
{isloading && <div className="loader" style={{position : 'fixed',top : 0,left : 0,right : 0, bottom : 0,display : 'flex',justifyContent : 'center',alignItems : 'center',backgroundColor : 'white',zIndex : 1040,flexDirection : 'column'}}>
<Audio
    height="100"
    width="100"
    color='#121e1e'
    ariaLabel='loading'
  />
  <h4 style={{color : '#121e1e',letterSpacing : 1}}>Please wait, this might take a while</h4>
  </div> }

{showpositionmodal && <div className="positionmodal">
    <button id="close" onClick={() => {setshowpositionmodal(false);}}>Close</button>
    <h4>Enter Position where you want to place logo</h4>
    <div>
        <button onClick={() => {setpositionmodalposition("TL")}} className={positionmodalposition === "TL" ? 'special' : 'normal'}>Top Left</button>
        <button onClick={() => {setpositionmodalposition("TR")}} className={positionmodalposition === "TR" ? 'special' : 'normal'}>Top Right</button>
        <button onClick={() => {setpositionmodalposition("BL")}} className={positionmodalposition === "BL" ? 'special' : 'normal'}>Bottom Left</button>
        <button onClick={() => {setpositionmodalposition("BR")}} className={positionmodalposition === "BR" ? 'special' : 'normal'}>Bottom Right</button>
    </div>
    <button id="download" onClick={finalisedownload}>Download</button>
    
</div> }

        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Profile"
      > 
        <div className="innerview">
           {currentlyuploading ? <h3>Please wait while uploading</h3> : <h3>Your Profile</h3> }
            <h4>Upload your company logo (Try to maintain aspect ratio of logo close to 2.5 (width/height) for best experience)</h4>
            <img src={selectedImage} width={200} height='auto' />
            <input
                type="file"
                name="myImage"
                accept="image/*"
                onChange={(e) => {
                console.log(URL.createObjectURL(e.target.files[0]));
                setSelectedImage(URL.createObjectURL(e.target.files[0]));
                setrawfile(e.target.files[0]);
                }}
            />
            <h4>Your Tagline</h4>
            <textarea defaultValue={tagline} style={{width : '100%',height : '100px'}} onChange={e => settagline(e.target.value)}></textarea>
            {currentlyuploading ? '' : <button onClick={processupload} style={{backgroundColor : '#121e1e',border : 'none',color : 'white',padding : 10,margin : 10,borderRadius : 5}}>Update</button>}
        </div>
        
       
      </Modal>


      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal2}
        onRequestClose={closeModal2}
        style={customStyles2}
        contentLabel="Profile"
      >

          <div className="innerview">
          {currentlyuploading ? <h3>Please wait while uploading</h3> : <h3>Upload New</h3> }
              <h4>Choose Category</h4>
              <select onChange={e => {setselectednewrawfile(null); setnewrawfile(null); setnewcontentcategory(e.target.value)}}>
                  <option selected={newcontentcategory === "Video"}>Video</option>
                  <option selected={newcontentcategory === "Image"}>Image</option>
                  <option selected={newcontentcategory === "PDF"}>PDF</option>
                  <option selected={newcontentcategory === "Album"}>Album</option>
              </select>
              {/* <h4>Choose position for logo</h4>
              <select onChange={e => setnewcontentlogoposiiton(e.target.value)}>
                  <option>Top Left</option>
                  <option>Top Right</option>
                  <option>Bottom Left</option>
                  <option>Bottom Right</option>
              </select> */}
              <h4>{newcontentcategory === "Album" ? 'Enter Album Name' : 'Enter Title'}</h4>
              <input type="text" onChange={e => setnewcontenttitle(e.target.value)} style={{width : '40vw',padding : 10}} />
              <h4>{newcontentcategory === "Album" ? 'Upload Album Images' : 'Upload your content'}</h4>
              <input
                type="file"
                name="myImage"
                multiple={newcontentcategory === "Album"}
                onChange={(e) => {
                    console.log(typeof e.target.files);
                    console.log(e.target.files);
                if(newcontentcategory === "Album") {
                    var cbo = [];
                    var rawf = [];
                    Object.values(e.target.files).map((file) => {
                        console.log(file);
                        cbo.push(URL.createObjectURL(file));
                        rawf.push(file);
                    })
                    setselectednewrawfile(cbo);
                    setnewrawfile(rawf);
                }
                else {
                    setselectednewrawfile(URL.createObjectURL(e.target.files[0]));
                    setnewrawfile(e.target.files[0]);
                }
                }}
            />
            {currentlyuploading ? '' : <button onClick={processnewupload} style={{backgroundColor : '#121e1e',border : 'none',color : 'white',padding : 10,margin : 10,borderRadius : 5}}>Upload</button>}

          </div>
        
      </Modal>


      <Modal
        isOpen={modalIsOpen3}
        onAfterOpen={afterOpenModal3}
        onRequestClose={closeModal3}
        style={customStyles3}
        contentLabel="Profile"
      >

          <div className="innerview" id="innerpdf">

         

                {

                    modalimage != null ? 
                    modalimagetype == "image" ?
                    <img src = {modalimage}   style={{width:"50vw",maxHeight : '70vh',objectFit : 'contain'}}/>
                    : <object  width="600" height="750" data={modalimage}  type="application/pdf">   </object>

                    : ""
                }
          </div>
        
      </Modal>

      <Modal
        isOpen={modalIsOpen4}
        onAfterOpen={afterOpenModal4}
        onRequestClose={closeModal4}
        style={customStyles4}
        contentLabel="Profile"
      >

          <div className="innerview" style={{padding : '20px'}}>
                <h4>You do not have sufficient downloads left,  kindly contact Admin</h4>
          </div>
        
      </Modal>


      <Modal
        isOpen={modalIsOpen5}
        onAfterOpen={afterOpenModal5}
        onRequestClose={closeModal5}
        style={customStyles5}
        contentLabel="Profile"
      > 
        <div className="innerview" style={{border : '2px solid #121e1e',padding : 10,borderRadius : 10,height : '90vh',marginTop : '10vh',overflow : 'scroll'}}>
            {
                selectedalbumtoopen && <div>
                    <button style={{backgroundColor : '#121e1e',color : 'white',border: 'none',padding : 10,borderRadius : 5,fontWeight : 'bolder',marginRight : 10}} onClick={() => {setselectedalbumtoopen(null); setIsOpen5(false);}}>Close</button>
                    <h4>{selectedalbumtoopen.title}</h4>
                    <button onClick={doanloadalltapped} style={{backgroundColor : '#121e1e',color : 'white',border: 'none',padding : 10,borderRadius : 5,fontWeight : 'bolder',marginRight : 10}}>Download All Images</button>
                    {isadmin && <div style={{marginTop : 20 , backgroundColor : '#f2b42b',padding : 10}}>
                        <input
                            type="file"
                            name="myImage"
                            multiple={newcontentcategory === "Album"}
                            onChange={(e) => {
                                console.log(typeof e.target.files);
                                console.log(e.target.files);
                            if(newcontentcategory === "Album") {
                                var cbo = [];
                                var rawf = [];
                                Object.values(e.target.files).map((file) => {
                                    console.log(file);
                                    if(file.type.substring(0, 5) == "image") {
                                        cbo.push(URL.createObjectURL(file));
                                        rawf.push(file);
                                    }
                                })
                                setselectednewrawfile(cbo);
                                setnewrawfile(rawf);
                            }
                            else {
                                setselectednewrawfile(URL.createObjectURL(e.target.files[0]));
                                setnewrawfile(e.target.files[0]);
                            }
                            }}
                        />
                           <button style={{backgroundColor : '#121e1e',color : 'white',border: 'none',padding : 10,borderRadius : 5,fontWeight : 'bolder',marginRight : 10}} onClick={uploadexistingalbum}>Upload Image</button>
        
                            <button style={{backgroundColor : '#121e1e',color : 'white',border: 'none',padding : 10,borderRadius : 5,fontWeight : 'bolder',marginRight : 10}} onClick={deleteexistingalbum}>Delete this Album</button>
                    </div>}
                     

                    <div style={{display : 'flex',flexDirection : 'row',flexWrap : 'wrap',overflow : 'scroll'}}>
                        {
                           selectedalbumtoopen.contenturl.map(eak => {
                               return (
                               <div style={{display : 'flex',flexDirection :'column',alignItems : 'center',flexWrap : 'wrap',marginTop : 20}}>
                                   <img onClick={() => {
                                    setmodalimage(eak.value);
                                    setIsOpen3(true);
                                    setIsOpen5(false);
                                }} src={eak.value} style={{width : '220px',height : '300px',objectFit : 'contain',margin : 20, backgroundColor : '#f0f0f0',borderRadius : 5,borderWidth : '3px',borderColor : '#f2b42b'}}/>
                                   <button onClick={() => downloadrequested({category : 'Image',contenturl : eak.value},'image')} style={{backgroundColor : '#121e1e',color : 'white',border: 'none',padding : 10,borderRadius : 5,fontWeight : 'bolder'}}>Download this Media</button>
                                   {isadmin && <button style={{backgroundColor : '#f2b42b',color : 'white',border: 'none',padding : 10,borderRadius : 5,fontWeight : 'bolder',marginTop : 10}} onClick={() => deletealbummediarequested(eak.value)}>Delete this media</button>}

                                </div>
                                )
                           })
                        }
                    </div>
                </div>
            }
        </div>
        
       
      </Modal>


            <div className='upper'>
                <div className="part">
                    <img src={require('./vgnewlogo.png')} style={{width : 150}}/>
                    <h4>Creatives Downloader</h4>
                </div>
                <div>
                {currentuser != null && (isadmin) && <button onClick={() => setIsOpen2(true)}>Upload New Content</button>}
                {currentuser != null && <button onClick={() => setIsOpen(true)}>Profile</button>}
                <button onClick={logouttapped}>Logout</button>
                </div>
            </div>
            <div className='middle'>
                <button onClick={() =>setdisplaycategory('All')} className={displaycategory == "All" ? 'highlight' : ''}>All</button>
                <button onClick={() => setdisplaycategory('Images')} className={displaycategory == "Images" ? 'highlight' : ''}>Images</button>
                <button onClick={() =>setdisplaycategory('Videos')} className={displaycategory == "Videos" ? 'highlight' : ''}>Videos</button>
                <button onClick={() =>setdisplaycategory('PDF')} className={displaycategory == "PDF" ? 'highlight' : ''}>PDF</button>

                {/* <button onClick={() =>setdisplaycategory('Gifs')} className={displaycategory == "Gifs" ? 'highlight' : ''}>GIFs</button> */}
            </div>
            <div className="lower">
                {
                    displaycategory == "All" && contentsloaded && allcontents.map(eachcontent => {
                        return eachcontent.category == "Video" ? (
                            <div className='eachmedia'>
                            <video  controls >
                                <source src={eachcontent.contenturl} />
                            </video>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'video')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}

                            </div>
                        ) :  eachcontent.category == "PDF" ? (
                            <div className='eachmedia'>
                                <div  style={{padding : 20,paddingTop : 0,backgroundColor : 'white'}} width="90%" height="220">
                                    <button style={{marginBottom : 5}} onClick={() => {
                                        setmodalimagetype("pdf");
                                    setmodalimage(eachcontent.contenturl);
                                    setIsOpen3(true);
                                }}>View</button>
                            <object  width="100%" height="150" data={eachcontent.contenturl}  type="application/pdf">   </object>
                            </div>

                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'pdf')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}


                            </div>
                        ):  eachcontent.category == "Album" ? (
                            <div className='eachmedia'>
                            <div className='wrapper' style={{ height:"220px",backgroundColor : 'black',justifyContent : 'center',alignItems : 'center',display :'flex'}}>
                            <img src={eachcontent.contenturl[0].value} onClick={() => {
                                // setmodalimage(eachcontent.contenturl);
                                // setIsOpen3(true);
                            }} />
                            </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => openalbum(eachcontent)}>View Album</button>

                            </div>
                        )
                        : (
                            <div className='eachmedia'>
                                <div className='wrapper' style={{ height:"220px",backgroundColor : 'black',justifyContent : 'center',alignItems : 'center',display :'flex'}}>
                                <img src={eachcontent.contenturl} onClick={() => {
                                    setmodalimage(eachcontent.contenturl);
                                    setIsOpen3(true);
                                }} />
                                </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'image')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}


                            </div>
                        )
                    })
                }
                {
                    displaycategory == "Images" && contentsloaded && allcontents.filter(each => each.category == "Image" || each.category == "Album").map(eachcontent => {
                        return eachcontent.category == "Video" ? (
                            <div className='eachmedia'>
                            <video  controls >
                                <source src={eachcontent.contenturl} />
                            </video>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'video')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}

                            </div>
                        )
                        :  eachcontent.category == "Album" ? (
                            <div className='eachmedia'>
                            <div className='wrapper' style={{ height:"220px",backgroundColor : 'black',justifyContent : 'center',alignItems : 'center',display :'flex'}}>
                            <img src={eachcontent.contenturl[0].value} onClick={() => {
                                // setmodalimage(eachcontent.contenturl);
                                // setIsOpen3(true);
                            }} />
                            </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => openalbum(eachcontent)}>View Album</button>

                            </div>
                        )
                        : (
                            <div className='eachmedia'>
                                <div className='wrapper' style={{ height:"220px",backgroundColor : 'black',justifyContent : 'center',alignItems : 'center',display :'flex'}}>
                                <img src={eachcontent.contenturl} onClick={() => {
                                    setmodalimage(eachcontent.contenturl);
                                    setIsOpen3(true);
                                }} />                               </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'image')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}


                            </div>
                        )
                    })
                }
                {
                    displaycategory == "Videos" && contentsloaded && allcontents.filter(each => each.category == "Video").map(eachcontent => {
                        return eachcontent.category == "Video" ? (
                            <div className='eachmedia'>
                            <video  controls >
                                <source src={eachcontent.contenturl} />
                            </video>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'video')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}


                            </div>
                        )
                        : (
                            <div className='eachmedia'>
                                <div className='wrapper' style={{ height:"220px",backgroundColor : 'black',justifyContent : 'center',alignItems : 'center',display :'flex'}}>
                                <img src={eachcontent.contenturl} onClick={() => {
                                    setmodalimage(eachcontent.contenturl);
                                    setIsOpen3(true);
                                }} />                               </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'image')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}

                            </div>
                        )
                    })
                }
                                {
                    displaycategory == "PDF" && contentsloaded && allcontents.filter(each => each.category == "PDF").map(eachcontent => {
                        return eachcontent.category == "PDF" ? (
                            <div className='eachmedia'>
                                             <div  style={{padding : 20,paddingTop : 0,backgroundColor : 'white'}} width="90%" height="220">
                                    <button style={{marginBottom : 5}} onClick={() => {
                                        setmodalimagetype("pdf");
                                    setmodalimage(eachcontent.contenturl);
                                    setIsOpen3(true);
                                }}>View</button>
                            <object  width="100%" height="150" data={eachcontent.contenturl}  type="application/pdf">   </object>
                            </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'pdf')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}

                            </div>
                        )
                        : (
                            <div className='eachmedia'>
                                <div className='wrapper' style={{ height:"220px",backgroundColor : 'black',justifyContent : 'center',alignItems : 'center',display :'flex'}}>
                                <img src={eachcontent.contenturl} onClick={() => {
                                    setmodalimage(eachcontent.contenturl);
                                    setIsOpen3(true);
                                }} />                               </div>
                            <h4>{eachcontent.title}</h4>
                            <button onClick={() => downloadrequested(eachcontent,'image')}>Download this media</button>
                            {isadmin && <button style={{backgroundColor : '#f2b42b'}} onClick={() => deleterequested(eachcontent.contenturl)}>Delete this media</button>}

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Homepage
