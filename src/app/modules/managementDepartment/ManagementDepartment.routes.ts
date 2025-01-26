import express from "express" 
import validateRequest from "../../middleware/validateRequest";
import { ManagementDepartmentController } from "./managementDepartment.controller";
import { ManagementDepartmentValidation } from "./managementDepartment.validation";
const router = express.Router()

router.post(
    '/create-management',  
    validateRequest(ManagementDepartmentValidation.createManagementDepartmentZodSchema),
    ManagementDepartmentController.createManagementDepartment
  );

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment);
  
router.get('/', ManagementDepartmentController.getAllManagementDepartments);
  

  
  router.patch(
    '/:id',
    validateRequest(ManagementDepartmentValidation.updateManagementDepartmentZodSchema),
    ManagementDepartmentController.updateManagementDepartment
  );

 export const ManagementDepartmentRoutes = router;