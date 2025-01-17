import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [temprollNumber, setTempRollNumber] = useState("");


  const fetchDetails = () => {
    // Fetch data from the backend
    setRollNumber(temprollNumber%100)
    axios
      .get(`http://localhost:3000/data`)
      .then((response) => {
        setData(response.data);
        console.log("Data fetched succesfully");
        console.log(response.data);
        console.log(data);
      })

      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Unable to fetch data. Please try again later.");
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center mt-10">Biometric Data</h1>
      <div className="flex flex-row justify-center w-[fit] my-3 gap-10">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={temprollNumber}
          className="h-4 border border-black p-6 w-[30%] rounded-md "
          onChange={(e) => setTempRollNumber(e.target.value)}
        />
        <button
          onClick={fetchDetails}
          className="border border-black px-3 py-3 rounded-md w-fit"
        >
          Fetch Details
        </button>
      </div>

     

      <div className="bg-gray-100  flex items-center justify-center py-10">
        <div className="container mx-auto p-4">
        {data.length > 0 ? (
          
          <h1 className="text-2xl font-bold mb-6 text-center">
            Attendance Details
          </h1>
          ) : " " }

          {data.length > 0 && parseInt(rollNumber, 10) < 57 &&
            data.map((data, index) => (
              <div
                className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden "
                key={index}
              >
                {index == parseInt(rollNumber, 10) + 7 ? (
                  <div className="">
                   {Object.entries(data).map(([key, value], i2) => (
                      <div key={i2}>
                        {i2 === 0 ? (
                          <div className="border-b px-4 py-2 bg-gray-100">
                            <h2 className="text-lg font-semibold">
                              Student Information
                            </h2>
                          </div>
                        ) : (
                          <div className="hidden"></div>
                        )}
                        
                          {key == "__EMPTY" ? (
                            <div className="flex justify-between p-4">
                              <span className="font-medium">
                                Registration Number:
                              </span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}

                          {key == "__EMPTY_1" ? (
                            <div className="flex justify-between p-4  bg-gray-100">
                              <span className="font-medium">Biometric ID:</span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}
                          {key == "__EMPTY_2" ? (
                            <div className="flex justify-between p-4">
                              <span className="font-medium">Name:</span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}
                       
                          {i2 == Object.entries(data).length - 3 ? (
                            <div className="flex justify-between p-4 bg-gray-100">
                              <span className="font-medium">Present Days:</span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}
                          {i2 == Object.entries(data).length - 2 ? (
                            <div className="flex justify-between p-4 ">
                              <span className="font-medium">Working Days:</span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}
                          {i2 == Object.entries(data).length - 1 ? (
                            <div className="flex justify-between p-4 bg-gray-100">
                              <span className="font-medium">
                                Attendance Percentage:
                              </span>
                              <span className="text-gray-700">{value}%</span>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                
              </div>
            ))}
            
            {data.length < 0 && parseInt(rollNumber, 10) > 56 && <div className="text-center text-xl text-red-700">Enter valid Roll Number</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
