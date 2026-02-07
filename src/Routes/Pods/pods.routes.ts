// CENTRALISED ROUTING OF ALL PODS RELATED ROUTES

// APPROACH OF PODS
// hybrid architecture : we are gonna use http methods and socket.io (websockets) for pods.
// we need http methods for authoritative state changes like creating, deleting pods and websockets for real-time data transfer and updates.

// requirements
// creating pods, joining pods, leaving pods, deleting pods, listing pods, updating pods,
// getting pod details, get pod members, pod roles and permissions management, assigning roles to members,
// real-time chat within pods, notifications for pod activities, pod activity logs, pod settings management.
// searching for pods, pod admin powers, superuser power

// each pod also has a built in voice/video huddle like calling feature. so start_call, leave_call, notifying

// auto joining of channels(general, resources, whiteboard, activitylog) residing within pods upon joining a pod.
// searching within a channel;

// joining of pods happens by three mechanisms: public/featured/recommended discovery, invitelink, and matchmaking algo of weights and bias

// middlewares :
// requireAuth: authenticates the jwt token and grants access.
// loadUserContext: fetches and caches all necessary details of user once reducing db calls
// loadPodContext: fetches and caches all necessary details of pod once reducing db calls
// validateSchema: validates pod creation, updation, podID, content sent in a channel
// isPodMember: checks if pod member and then authorised functions
// requireRole: checks for role of the pod member: admin gets admin rights
// podCreateLimit: checks for no of created pods
// requireSubscription: check for the tier of the user
// validInviteLink: validate invite link of a pod
// podMemberLimit: check for the max no of members in a pod

// flow
// > user goes to public/recommended/invited discovery of pods. clicks join. middlewares  requireauth, podMemberlimit,  instant join. http method
// > user has a invite link, clicks join. middlewares requireauth, validinvitelink, podmemberlimit, instant join. http method
// > user uses the matchmaking algo to find suitable pod. starts a socket connection and then queue + worker to get matched pods in real-time. middlewares requireauth, loadusercontext. websockets
// > user creates a pod. middlewares requireauth, loadusercontext, podscreatelimit, requiresubscription. http method
// > user joins a pod call. middlewares requireauth, loadusercontext, ispodmember. websockets
// > user sends message in pod channel. middlewares requireauth, loadusercontext, ispodmember, validateschema. websockets

// basically http will be the source of truth for pods and websockets will be the real-time sync mechanism for pods.

// non-negotiables rule
// No socket event is allowed to change DB state directly. Sockets can: request, validate, notify, sync. But never mutate without an HTTP-backed service call

import { Router } from "express";

import { SessionCheckingMiddleware } from "../../Validators/Middleware/shared/Session.Middleware.js";
import { loadUserContext } from "../../Validators/Middleware/shared/loadUserContexts.js";
import { loadPodContext } from "../../Validators/Middleware/shared/loadPodContext.js";

import { podCreateLimitMiddleware } from "../../Validators/Middleware/pods/podCreateLimit.js";
import { isPodJoinable } from "../../Validators/Middleware/pods/isPodJoinable.js";
import { requirePodMember } from "../../Validators/Middleware/pods/requirePodMember.js";
import { requirePodRole } from "../../Validators/Middleware/pods/requirePodRole.js";


import { joinPodController } from "../../Controler/Pods/joinPod.controller.js";
import { inviteJoinController } from "../../Controler/Pods/inviteJoin.controller.js";
import { leavePodController } from "../../Controler/Pods/leavepod.controller.js";
import { GetPublicPodsController } from "../../Controler/Pods/getPublicPods.controller.js";
import { CreatePodController } from "../../Controler/Pods/createPod.controller.js";
import { DeletePodController } from "../../Controler/Pods/deletePod.controller.js";
import { GetPodListController } from "../../Controler/Pods/getPodList.controller.js";
import { GetPodDetailsController } from "../../Controler/Pods/getPodDetails.controller.js";
import { GetPodMembersController } from "../../Controler/Pods/getPodMembers.controller.js";
import { UpdatePodController } from "../../Controler/Pods/updatePod.controller.js";
import { AssignPodRoleController } from "../../Controler/Pods/assignRole.controller.js";
import { SearchPodsController } from "../../Controler/Pods/search.controller.js";
import { GeneratePodInviteLinkController } from "../../Controler/Pods/generateInvite.controller.js";
import { CreateMessageController } from "../../Controler/Pods/createMessage.controller.js";

const router = Router();

// DISCOVERY

// User pod list
router.get(
  "/@me",
  SessionCheckingMiddleware,
  GetPodListController
);

// Public pods
router.get(
  "/public",
  SessionCheckingMiddleware,
  GetPublicPodsController
);

// Search pods
router.get(
  "/search",
  SessionCheckingMiddleware,
  loadUserContext,
  SearchPodsController
);

// CREATE PODS

router.post(
  "/create",
  SessionCheckingMiddleware,
  loadUserContext,
  podCreateLimitMiddleware,
  CreatePodController
);

// MEMBERSHIP

// Join pod
router.post(
  "/:podId/join",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  isPodJoinable,
  joinPodController
);

// Join pod via invite link
router.post(
  "/join/invite",
  SessionCheckingMiddleware,
  loadUserContext,
  inviteJoinController
)

// Leave pod
router.post(
  "/:podId/leave",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  requirePodMember,
  leavePodController
);

// POD MANAGEMENT

// Delete pod (OWNER only)
router.delete(
  "/:podId/delete",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  requirePodRole("owner"),
  DeletePodController
);

// Update pod (OWNER + ADMIN)
router.patch(
  "/:podId/update",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  requirePodRole("owner", "admin"),
  UpdatePodController
);

// POD INFO

router.get(
  "/:podId",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  GetPodDetailsController
);

// router.get(
//   "/:podId/members",
//   SessionCheckingMiddleware,
//   loadUserContext,
//   loadPodContext,
//   requirePodMember,
//   GetPodMembersController
// );

// ROLE MANAGEMENT

// safest default: owner controls roles
router.post(
  "/:podId/assign-role",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  requirePodRole("owner"),
  AssignPodRoleController
);

// INVITES

router.post(
  "/:podId/invite-link",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  requirePodMember,
  requirePodRole("owner", "admin"),
  GeneratePodInviteLinkController
);

// MESSAGES

// HTTP persistence endpoint
router.post(
  "/:podId/messages",
  SessionCheckingMiddleware,
  loadUserContext,
  loadPodContext,
  requirePodMember,
  CreateMessageController
);

export default router;
