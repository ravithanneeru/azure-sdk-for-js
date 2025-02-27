/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  BareMetalMachineCordonParameters,
  BareMetalMachinesCordonOptionalParams,
  NetworkCloud
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Cordon the provided bare metal machine's Kubernetes node.
 *
 * @summary Cordon the provided bare metal machine's Kubernetes node.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/preview/2022-12-12-preview/examples/BareMetalMachines_Cordon.json
 */
async function cordonBareMetalMachine() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const bareMetalMachineName = "bareMetalMachineName";
  const bareMetalMachineCordonParameters: BareMetalMachineCordonParameters = {
    evacuate: "True"
  };
  const options: BareMetalMachinesCordonOptionalParams = {
    bareMetalMachineCordonParameters
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.beginCordonAndWait(
    resourceGroupName,
    bareMetalMachineName,
    options
  );
  console.log(result);
}

async function main() {
  cordonBareMetalMachine();
}

main().catch(console.error);
