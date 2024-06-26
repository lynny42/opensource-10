const helper = {
  //   helper functions
  getObjectsIdsUrl: (departmentId) =>
    `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`,
  getObjectUrl: (objectId) =>
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
  // util functions
  $: document.querySelector.bind(document),
  use: (url) =>
    fetch(url)
      .then((res) => res.json())
      .catch(() => {
        console.log("일시적으로 페이지를 사용할 수 없습니다.");
        window.location.href = "./main.html";
      }),
  iife: (fn) => fn(),
};
const constants = helper.iife(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const departmentName = searchParams.get("department-name");
  const departmentId = searchParams.get("department-id");
  return { departmentName, departmentId };
});

const objectIdsPromise = helper.use(
  helper.getObjectsIdsUrl(constants.departmentId)
);

function* loadObjects(objectIds) {
  let flag = 0;
  while (flag < objectIds.length) {
    const objectPromises = objectIds
      .slice(flag, flag + 50)
      .map(helper.getObjectUrl)
      .map(helper.use);
    flag += 50;
    yield Promise.all(objectPromises);
  }
  return Promise.reject("끝");
}

const hideSkeleton = () => {
  helper.$(".skeleton").classList.add("hidden");
};
const showSkeleton = () => {
  helper.$(".skeleton").classList.add("mt-2");
  helper.$(".skeleton").classList.remove("hidden");
};

const renderObjects = (objects) => {
  const imageList = objects
    .map((object, i) => {
      const img = document.createElement("img");
      img.src = object.primaryImageSmall;
      img.alt = object.title;
      img.title = object.title;
      img.classList.add(
        "object-cover",
        "w-full",
        "h-full",
        "hover:scale-105",
        "duration-300"
      );
      const a = document.createElement("a");
      a.href = `./image.html?object-id=${object.objectID}`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.classList.add("aspect-square", "block", "overflow-hidden");
      if (Math.random() < 8 && i % 15 === 0) {
        a.classList.add("row-span-2");
        a.classList.add("col-span-2");
      }
      a.appendChild(img);
      img.addEventListener("error", () => {
        a.remove();
      });
      return a;
    })
    .reduce((acc, img) => {
      acc.appendChild(img);
      return acc;
    }, document.createDocumentFragment());

  hideSkeleton();
  helper.$("#image-list").appendChild(imageList);
};

helper.$("#department-name").textContent = constants.departmentName;

let sequence;
objectIdsPromise
  .then((data) => {
    sequence = loadObjects(data.objectIDs);
    return sequence.next().value;
  })
  .then(renderObjects)
  .then(() => {
    helper.$("#load-more-button").classList.remove("hidden");
  })
  .catch(console.error);

helper.$("#load-more-button").addEventListener("click", () => {
  showSkeleton();
  sequence
    .next()
    .value.then(renderObjects)
    .catch(() => {
      helper.$("#load-more-button").classList.add("hidden");
    });
});
