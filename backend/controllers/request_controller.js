// const Request = require('../modules/requestSchema');  // Ensure correct path
// const Project = require('../modules/projectSchema');  // Ensure correct path
// const CurrentAccount = require('../modules/currentAccountSchema');  // Ensure correct path
import Request from "../models/requestSchema.js"
// import Project from "../modules/projectSchema"
import CurrentAccount from "../models/currentAccountSchema.js"
const getAllRequests = async (req, res) => {
    try {
        let requests = await Request.find()
            .populate('projectId', 'title')
            .populate('userId', 'name contact')
            .exec();

        if (requests.length > 0) {
            let modifiedRequests = requests.map((request) => {
                return {
                    _id: request._id,
                    projectId: request.projectId?._id || null,
                    projectTitle: request.projectId?.title || "Unknown Project",
                    userId: request.userId?._id || null,
                    requesterName: request.userId?.name || "Anonymous",
                    userContact: request.userId?.contact || "No contact info",
                    description: request.description,
                    amount: request.amount,
                    status: request.status,
                    rejectreason: request.rejectReason || "N/A",
                    date: request.date
                };
            });

            res.json(modifiedRequests);
        } else {
            res.status(404).json({ message: "No requests found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Fetching all requests, accessible by only the requester's own requests
const getRequestersRequest = async (req, res) => {
    try {
        // const requesterId = req.user._id;
           const requesterId = req.user._id.toString();//I converted it to strong to check it
        // Fetch requests by requester and aggregate counts
        const [requests, totalAccepted, totalPending, totalRejected] = await Promise.all([
            Request.find({ userId: requesterId }) // Fetch all requests
                .populate('projectId', 'title') // Populate projectId field with title from Project model
                .exec(),
            Request.countDocuments({ userId: requesterId, status: "Accepted" }), // Count accepted requests
            Request.countDocuments({ userId: requesterId, status: "Pending" }), // Count pending requests
            Request.countDocuments({ userId: requesterId, status: "Rejected" }), // Count rejected requests
        ]);

        if (requests.length > 0) {
            const requesterRequests = requests.map((request) => ({
                _id: request._id,
                projectId: request.projectId?._id || null,
                projectTitle: request.projectId?.title || "Unknown Project",
                description: request.description,
                amount: request.amount,
                status: request.status,
                rejectreason: request.rejectReason || "N/A",
                date: request.date,
            }));

            res.json({
                totalAccepted,
                totalPending,
                totalRejected,
                requests: requesterRequests,
            });
        } else {
            res.status(404).json({
                message: "No request history found.",
                totalAccepted: 0,
                totalPending: 0,
                totalRejected: 0,
                requests: [],
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
// Deleting a specific request by requester
const deleteRequest = async (req, res) => {
    try {
        const requesterId = req.user._id.toString(); 
        const { id } = req.params; 

        const request = await Request.findOne({ _id: id, userId: requesterId });

        if (!request) {
            return res.status(404).json({ message: "Request not found or unauthorized access." });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({ message: "Only pending requests can be deleted." });
        }

        await Request.deleteOne({ _id: id });
        res.status(200).json({ message: "Request deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


// Fetch total number of requests
const getRequestsStats = async (req, res, next) => {
    try {
      const totalRequests = await Request.countDocuments(); // Count all request documents
      res.status(200).json({ totalRequests }); // Respond with the count
    } catch (error) {
      next(error); // Pass any error to the error handler middleware
    }
  };
  

// const updateReq = async (req, res) => {
//     try {
//         const { status, rejectreason, amount } = req.body;  // Get amount from request body
        
//         const { id: requestId } = req.params;  

//         // Find the request by ID and update its status and rejectreason (if provided)
//         const result = await Request.findByIdAndUpdate(
//             requestId,
//             { status, rejectreason },  // Update status and rejectreason fields
//             { new: true }  
//         );

//         // Check if the request was found
//         if (!result) {
//             return res.status(404).json({ message: "Request not found" });
//         }

//         // If the request is accepted, subtract the requested amount from the totalDonatedAmount
//         if (status === 'Accepted') {
            
//             // Convert donatedAmount to Number
//         const amountToAdd = Number(amount);

//         // Find the current account and update totalDonatedAmount
//         const updatedAccount = await CurrentAccount.findOneAndUpdate(
//             {},  // Find the first document (since we want only one)
//             { $inc: { totalPaidAmount: amountToAdd } },  // Increment totalDonatedAmount
//             { new: true, upsert: true }  // Create if it doesn't exist
//         );
//             // Return the result of the request and the updated account information
//             return res.json({ request: result, account: updatedAccount, message: "Request updated and account adjusted." });
//         }

//         // If the request is not accepted, just return the updated request
//         res.json({ request: result, message: "Request updated." });

//     } catch (err) {
//         console.error(err);  
//         res.status(500).json({ message: "Error updating request", error: err.message });
//     }
// };
const updateReq = async (req, res) => { 
    try {
        const { status, rejectReason } = req.body; // Extract only allowed fields
        const { id: requestId } = req.params;    // Get request ID from params

        // Update only status and rejectReason
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status, rejectReason },
            { new: true, runValidators: true }
        );

        // If the request is not found
        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Adjust account if status is 'Accepted'
        if (status === 'Accepted') {
            const amountToAdd = Number(updatedRequest.amount); // Use the existing request amount

            const updatedAccount = await CurrentAccount.findOneAndUpdate(
                {}, // Assuming a single document for account tracking
                { $inc: { totalPaidAmount: amountToAdd } },
                { new: true, upsert: true }
            );

            return res.json({
                message: "Request updated successfully and account adjusted.",
                request: updatedRequest,
                account: updatedAccount
            });
        }

        res.json({ message: "Request updated successfully.", request: updatedRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating request", error: err.message });
    }
};


const addRequest = async (req, res) => {
    try {
        const userId = req.user?.id; // Assuming req.user is populated via middleware
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing or invalid" });
        }

        const request = new Request({
            ...req.body,
            userId, // Set userId from the authenticated user
            status: 'Pending',
        });

        const result = await request.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding request", error: err.message });
    }
};


// const addRequest = async (req, res) => {
//     try {
//         const request = new Request({
//             ...req.body,
//             status: 'Pending',  // Set status to 'pending'
//         });

//         let result = await request.save();
//         res.json(result);
//     } catch (err) {
//         console.error(err);  // Log the error
//         res.status(500).json({ message: "Error adding request", error: err.message });
//     }
// };

const requesterUpdateReq = async (req, res) => {
    try {
        const { description, amount } = req.body;
        console.log( req.body)
        const { id: requestId } = req.params;   

        // Update only description and amount
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { description, amount },
            { new: true, runValidators: true }
        );

        // If the request is not found
        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.json({ message: "Request updated successfully.", request: updatedRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating request", error: err.message });
    }
};


export {
    getAllRequests,
    getRequestersRequest,
    addRequest,
    updateReq,
    getRequestsStats,
    deleteRequest,
    requesterUpdateReq
};