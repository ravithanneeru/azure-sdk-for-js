/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { AttachedDataNetworks } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MobileNetworkManagementClient } from "../mobileNetworkManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  AttachedDataNetwork,
  AttachedDataNetworksListByPacketCoreDataPlaneNextOptionalParams,
  AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams,
  AttachedDataNetworksListByPacketCoreDataPlaneResponse,
  AttachedDataNetworksDeleteOptionalParams,
  AttachedDataNetworksGetOptionalParams,
  AttachedDataNetworksGetResponse,
  AttachedDataNetworksCreateOrUpdateOptionalParams,
  AttachedDataNetworksCreateOrUpdateResponse,
  TagsObject,
  AttachedDataNetworksUpdateTagsOptionalParams,
  AttachedDataNetworksUpdateTagsResponse,
  AttachedDataNetworksListByPacketCoreDataPlaneNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing AttachedDataNetworks operations. */
export class AttachedDataNetworksImpl implements AttachedDataNetworks {
  private readonly client: MobileNetworkManagementClient;

  /**
   * Initialize a new instance of the class AttachedDataNetworks class.
   * @param client Reference to the service client
   */
  constructor(client: MobileNetworkManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the attached data networks associated with a packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param options The options parameters.
   */
  public listByPacketCoreDataPlane(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    options?: AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams
  ): PagedAsyncIterableIterator<AttachedDataNetwork> {
    const iter = this.listByPacketCoreDataPlanePagingAll(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCoreDataPlaneName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByPacketCoreDataPlanePagingPage(
          resourceGroupName,
          packetCoreControlPlaneName,
          packetCoreDataPlaneName,
          options,
          settings
        );
      }
    };
  }

  private async *listByPacketCoreDataPlanePagingPage(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    options?: AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<AttachedDataNetwork[]> {
    let result: AttachedDataNetworksListByPacketCoreDataPlaneResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByPacketCoreDataPlane(
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByPacketCoreDataPlaneNext(
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByPacketCoreDataPlanePagingAll(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    options?: AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams
  ): AsyncIterableIterator<AttachedDataNetwork> {
    for await (const page of this.listByPacketCoreDataPlanePagingPage(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCoreDataPlaneName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Deletes the specified attached data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    options?: AttachedDataNetworksDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        attachedDataNetworkName,
        options
      },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified attached data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    options?: AttachedDataNetworksDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCoreDataPlaneName,
      attachedDataNetworkName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets information about the specified attached data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    options?: AttachedDataNetworksGetOptionalParams
  ): Promise<AttachedDataNetworksGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        attachedDataNetworkName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Creates or updates an attached data network. Must be created in the same location as its parent
   * packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param parameters Parameters supplied to the create or update attached data network operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    parameters: AttachedDataNetwork,
    options?: AttachedDataNetworksCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<AttachedDataNetworksCreateOrUpdateResponse>,
      AttachedDataNetworksCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<AttachedDataNetworksCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        attachedDataNetworkName,
        parameters,
        options
      },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates an attached data network. Must be created in the same location as its parent
   * packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param parameters Parameters supplied to the create or update attached data network operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    parameters: AttachedDataNetwork,
    options?: AttachedDataNetworksCreateOrUpdateOptionalParams
  ): Promise<AttachedDataNetworksCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      packetCoreControlPlaneName,
      packetCoreDataPlaneName,
      attachedDataNetworkName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates an attached data network tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param attachedDataNetworkName The name of the attached data network.
   * @param parameters Parameters supplied to update attached data network tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    attachedDataNetworkName: string,
    parameters: TagsObject,
    options?: AttachedDataNetworksUpdateTagsOptionalParams
  ): Promise<AttachedDataNetworksUpdateTagsResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        attachedDataNetworkName,
        parameters,
        options
      },
      updateTagsOperationSpec
    );
  }

  /**
   * Gets all the attached data networks associated with a packet core data plane.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param options The options parameters.
   */
  private _listByPacketCoreDataPlane(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    options?: AttachedDataNetworksListByPacketCoreDataPlaneOptionalParams
  ): Promise<AttachedDataNetworksListByPacketCoreDataPlaneResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        options
      },
      listByPacketCoreDataPlaneOperationSpec
    );
  }

  /**
   * ListByPacketCoreDataPlaneNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param packetCoreDataPlaneName The name of the packet core data plane.
   * @param nextLink The nextLink from the previous successful call to the ListByPacketCoreDataPlane
   *                 method.
   * @param options The options parameters.
   */
  private _listByPacketCoreDataPlaneNext(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    packetCoreDataPlaneName: string,
    nextLink: string,
    options?: AttachedDataNetworksListByPacketCoreDataPlaneNextOptionalParams
  ): Promise<AttachedDataNetworksListByPacketCoreDataPlaneNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        packetCoreControlPlaneName,
        packetCoreDataPlaneName,
        nextLink,
        options
      },
      listByPacketCoreDataPlaneNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCoreDataPlanes/{packetCoreDataPlaneName}/attachedDataNetworks/{attachedDataNetworkName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCoreDataPlaneName,
    Parameters.attachedDataNetworkName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCoreDataPlanes/{packetCoreDataPlaneName}/attachedDataNetworks/{attachedDataNetworkName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AttachedDataNetwork
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCoreDataPlaneName,
    Parameters.attachedDataNetworkName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCoreDataPlanes/{packetCoreDataPlaneName}/attachedDataNetworks/{attachedDataNetworkName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AttachedDataNetwork
    },
    201: {
      bodyMapper: Mappers.AttachedDataNetwork
    },
    202: {
      bodyMapper: Mappers.AttachedDataNetwork
    },
    204: {
      bodyMapper: Mappers.AttachedDataNetwork
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCoreDataPlaneName,
    Parameters.attachedDataNetworkName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateTagsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCoreDataPlanes/{packetCoreDataPlaneName}/attachedDataNetworks/{attachedDataNetworkName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.AttachedDataNetwork
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCoreDataPlaneName,
    Parameters.attachedDataNetworkName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByPacketCoreDataPlaneOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/packetCoreControlPlanes/{packetCoreControlPlaneName}/packetCoreDataPlanes/{packetCoreDataPlaneName}/attachedDataNetworks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AttachedDataNetworkListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCoreDataPlaneName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByPacketCoreDataPlaneNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AttachedDataNetworkListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.packetCoreControlPlaneName,
    Parameters.packetCoreDataPlaneName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
