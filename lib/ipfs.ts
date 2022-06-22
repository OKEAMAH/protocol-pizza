export function ipfsFetchableUrl(url: string): string {
  if (url.startsWith("ipfs://")) {
    return "https://infura-ipfs.io/ipfs/" + url.replace("ipfs://", "");
  } else {
    return url;
  }
}

export async function postJSONToIPFS(
  data: any,
  addDataTag: boolean = true
): Promise<string> {
  let body = data;
  if (addDataTag) {
    body = {
      data: body,
    };
  }

  const result = await fetch("https://www.rwtp.org/api/uploadJson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { cid } = await result.json();
  return cid;
}
