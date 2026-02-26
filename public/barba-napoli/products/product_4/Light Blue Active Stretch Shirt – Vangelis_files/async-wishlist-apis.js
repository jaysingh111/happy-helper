(function () {
if (typeof window.SwymStorefrontLayoutAPI === 'undefined') {
    window.SwymStorefrontLayoutAPI = {};
}

if (typeof window.SwymStorefrontLayoutContext == 'undefined') {
    window.SwymStorefrontLayoutContext = {};
}

SwymStorefrontLayoutContext.CustomEvents = {
    LayoutInitialized: "SwymStorefrontLayoutInitialized",
    AsyncApisInitialized: "SwymAsyncApisInitialized",
    SavedForLaterFetched: "SwymSavedForLaterFetched",
    WishlistFetched: "SwymWishlistFetched"
}

SwymStorefrontLayoutContext.ShopifyProductData = {};

// Cache validation function
SwymStorefrontLayoutContext.isCacheValid = function(productId) {
  const cachedData = SwymStorefrontLayoutContext.ShopifyProductData[productId];
  if (!cachedData) return false;

  // Check if cached data has required fields and they look valid
  const hasValidPrice = cachedData.price && typeof cachedData.price === 'number' && cachedData.price > 0;
  const hasValidImage = cachedData.image && cachedData.image.trim() !== '';
  const hasValidTitle = cachedData.title && cachedData.title.trim() !== '';

  return hasValidPrice && hasValidImage && hasValidTitle;
};

// Cache invalidation function
SwymStorefrontLayoutContext.clearCache = function() {
  SwymStorefrontLayoutContext.ShopifyProductData = {};
};

// Function to add required listcontext for B2B
SwymStorefrontLayoutContext.addListContextForB2B = function(listConfig){
  if(window.SwymWishlistCurrentCompanyLocation){
    listConfig.contextLocations = [{
        id: window.SwymWishlistCurrentCompanyLocation?.id
    }];
  }
  return listConfig;
}

Object.defineProperty(SwymStorefrontLayoutContext, 'fromCache', {
  get() {
    // Only use cache if it has valid product data
    const hasCache = !!SwymStorefrontLayoutContext.ShopifyProductData &&
                    Object.keys(SwymStorefrontLayoutContext.ShopifyProductData).length > 0;

    if (!hasCache) return false;

    // Check if at least one cached item is valid (as a proxy for cache health)
    const hasValidCache = Object.keys(SwymStorefrontLayoutContext.ShopifyProductData).some(productId =>
      SwymStorefrontLayoutContext.isCacheValid(productId)
    );

    return hasValidCache;
  },
  configurable: true
});

const swymInitWishlistAsyncApi = (swat) =>{
    const SwymWishlistDefaultName = swat.retailerSettings.UI.Title;

    const SwymWLAsyncApis = {
        'fetchLists': async function(){
            return new Promise(async (resolve, reject) => {
                swat.api.fetchLists({
                    callbackFn: lists => resolve(lists),
                    errorFn: err => reject(err)
                });
            });
        },
        'fetchListDetails': async function (lid){
            return new Promise(async (resolve, reject) => {
                swat.api.fetchListDetails(
                    { lid: lid },
                    listContents => resolve(listContents),
                    error => reject(error)
                );
            });
        },
        'fetchListProductsDetails': async function (lid){
            return new Promise(async (resolve, reject) => {
                swat.api.fetchListCtx(
                    { lid: lid },
                    listContents => resolve(listContents),
                    error => reject(error)
                );
            });
        },
        'createList': function (listName = SwymWishlistDefaultName) {
            return new Promise((resolve, reject) => {
                swat.utils.debounce(() => {
                    let listConfig = { "lname": listName };
                    swat.api.createList(
                        listConfig,
                        list => resolve(list),
                        error => reject(error)
                    );
                }, 1000)();
            });
        },
        'renameList': function(lid, lname = SwymWishlistDefaultName) {
            let listUpdateConfig = {
                lname,
                lid
            }
            return new Promise(async (resolve, reject) => {
                swat.api.updateList(listUpdateConfig,
                    list => resolve(list),
                    error => reject(error)
                );
            })
        },
        'deleteLists': async function (lists) {
            try {
                await Promise.all(lists.map(list =>
                    new Promise((resolve, reject) => {
                        swat.api.deleteList(
                            list.lid,
                            obj => resolve(obj),
                            error => reject(error)
                        );
                    })
                ));
                return { success: true };
            } catch (error) {
                swat.utils.error('Error encountered while deleting the list', error);
                throw error;
            }
        },
        'addProductsToList': async function (products, lid){
            return new Promise(async (resolve, reject) => {
                swat.api.addProductsToList(
                    lid,
                    products,
                    products => resolve(products),
                    error => reject(error)
                )
            })
        },
        'addProductToLists': async function (product, lists){
            return new Promise(async (resolve, reject) => {
                swat.api.addProductToLists(
                    product,
                    lists,
                    products => resolve(products),
                    error => reject(error)
                )
            })
        },
        'removeProductFromList': async function (product, lid){
            return new Promise(async (resolve, reject) => {
                swat.api.deleteFromList(
                    lid,
                    product,
                    deletedProduct => resolve(deletedProduct),
                    error => reject(error)
                )
            })
        },
        'removeProductFromLists': async function (product, lists){
            return new Promise(async (resolve, reject) => {
                swat.api.removeProductFromLists(
                    product,
                    lists,
                    deletedProduct => resolve(deletedProduct),
                    error => reject(error)
                )
            })
        },
        'updateProductFromList': async function (product, lid){
            return new Promise(async (resolve, reject) => {
                swat.api.updateListItem(
                    lid,
                    product,
                    updatedListItem => resolve(updatedListItem),
                    error => reject(error)
                )
            })
        },
        'getListsProducts': async function (lists) {
            return Object.values(
                (
                await Promise.all(
                    lists.map(async (list) =>
                        SwymWLAsyncApis.fetchListProductsDetails(list.lid)
                    )
                )
                )
                .flat()
                .reduce((acc, { epi, empi, du }) => {
                    acc[epi] = { epi, empi, du };
                    return acc;
                }, {})
            );
        },
        'generateSharedListURL': async function (lid){
            return new Promise(async (resolve, reject) => {
                swat.api.generateSharedListURL(
                    lid,
                    link => resolve(link),
                    error => reject(error)
                );
            });
        },
        'getProductDetails': async function (productParams) {
            return new Promise(async (resolve, reject) => {
                swat.api.getProductDetails(
                    productParams,
                    resolve,
                    reject
                );
            });
        },
        'fetchProductDataForList': async function(list = [], fromCache = false){
            if (!list || list.length === 0) {
                return Promise.resolve([]);
            }

            // Cache helpers (keep multiple-wishlist behavior from earlier implementation)
            const isOldControlCentre = !('multiple-wishlist' in (window?.SwymEnabledCommonFeatures || {}));
            const isMultipleWishlistEnabled = isOldControlCentre
              ? !!SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection
              : !!window?.SwymEnabledCommonFeatures?.['multiple-wishlist'];

            const useCache = (item) => fromCache && SwymStorefrontLayoutContext?.isCacheValid(item.epi) && SwymStorefrontLayoutContext.ShopifyProductData[item.epi];

            // If every item has valid cache, return cached data (old behavior)
            const allCached = fromCache && list.every(useCache);
            if (allCached) {
                const cachedList = list.map((item) => {
                    const cached = SwymStorefrontLayoutContext.ShopifyProductData[item.epi];
                    const cloned = isMultipleWishlistEnabled ? cached : JSON.parse(JSON.stringify(cached));
                    return Object.assign({}, item, { productData: cloned });
                });
                return Promise.resolve(cachedList);
            }

            // Only store items that successfully get product data
            const resultsMap = {};
            const itemsToFetch = [];
            
            // Separate cached vs uncached items
            list.forEach((item) => {
                if (useCache(item)) {
                    const cached = SwymStorefrontLayoutContext.ShopifyProductData[item.epi];
                    const cloned = isMultipleWishlistEnabled ? cached : JSON.parse(JSON.stringify(cached));
                    resultsMap[item.epi] = Object.assign({}, item, { productData: cloned });
                } else {
                    // Only fetch items not in cache
                    itemsToFetch.push(item);
                }
            });

            // If no items need fetching, return cached results immediately
            if (itemsToFetch.length === 0) {
                return Promise.resolve(Object.values(resultsMap));
            }

            // Helper function to merge product and variant details into resultsMap
            const mergeProductDetails = (listItem, productDetail, variantDetail) => {
                resultsMap[listItem.epi] = Object.assign({}, listItem, {
                    productData: productDetail,
                    pr: variantDetail.pr !== undefined ? variantDetail.pr : listItem.pr,
                    op: variantDetail.op !== undefined ? variantDetail.op : listItem.op,
                    stk: variantDetail.stk !== undefined ? variantDetail.stk : listItem.stk,
                    iu: variantDetail.featured_image || productDetail.featured_image || listItem.iu
                });
            };

            // Fetch via fetchProductForItems (web worker) - minimal tracking with timeout safety
            return new Promise((resolve, reject) => {
                const expectedEpis = new Set(itemsToFetch.map(item => item.epi));
                const processedEpis = new Set();
                let resolved = false;
                let responseCount = 0;
                
                // Safety timeout - if we don't resolve within 10 seconds, force resolve
                const timeoutId = setTimeout(() => {
                    if (!resolved) {
                        const missingEpis = Array.from(expectedEpis).filter(epi => !processedEpis.has(epi));
                        swat.utils.warn(
                            `fetchProductForItems TIMEOUT (10s): processed ${processedEpis.size}/${expectedEpis.size} EPIs, ` +
                            `${responseCount} total responses. Missing ${missingEpis.length} EPIs: ${missingEpis.slice(0, 10).join(', ')}${missingEpis.length > 10 ? '...' : ''}`
                        );
                        forceResolve('timeout');
                    }
                }, 10000);
                
                const forceResolve = (reason) => {
                    if (resolved) return;
                    resolved = true;
                    clearTimeout(timeoutId);
                    const validItems = Object.values(resultsMap).filter(item => item && item.productData);
                    swat.utils.log(`fetchProductForItems resolved via ${reason}: ${validItems.length} valid items out of ${expectedEpis.size} expected`);
                    resolve(validItems);
                };
                
                const checkComplete = (epi) => {
                    responseCount++;
                    if (epi === undefined || epi === null) {
                        swat.utils.warn(`fetchProductForItems: received undefined/null epi at response #${responseCount}`);
                        return;
                    }
                    processedEpis.add(epi);
                    swat.utils.log(`fetchProductForItems: processed ${processedEpis.size}/${expectedEpis.size} unique EPIs (response #${responseCount})`);
                    // Resolve as soon as all EPIs are processed
                    if (processedEpis.size === expectedEpis.size && !resolved) {
                        forceResolve('all-epis-processed');
                    }
                };
                
                swat.fetchProductForItems(
                    itemsToFetch,
                    function(transformedResponse, listItem) {
                        // itemSuccessFn: called for each successful fetch (may be called multiple times for redirects)
                        if (transformedResponse && transformedResponse.productDetail) {
                            const productDetail = transformedResponse.productDetail;
                            const variantDetail = transformedResponse.variantDetail || {};
                            SwymStorefrontLayoutContext.ShopifyProductData[listItem.epi] = isMultipleWishlistEnabled
                                ? productDetail
                                : JSON.parse(JSON.stringify(productDetail));

                            mergeProductDetails(listItem, productDetail, variantDetail);
                        }
                        checkComplete(listItem.epi);
                    },
                    function(error, listItem) {
                        // itemErrorFn: called for each failed fetch
                        swat.utils.warn(`Error fetching product data for ${listItem?.du || listItem?.epi}:`, error);
                        checkComplete(listItem.epi);
                    },
                    function(allResponses) {
                        // endFn: log only; resolution is driven by per-item callbacks or timeout
                        swat.utils.log(`fetchProductForItems endFn: received ${allResponses?.length || 0} responses`);
                    }
                );
            });
        },
        'fetchProductDataForLists': async function(lists = [], fromCache = false){
            // Consolidate all items from all lists and fetch in ONE batch to web worker
            // This prevents race conditions when multiple lists are enabled
            const allItems = [];
            const listItemMap = {}; // Track which items belong to which list
            
            lists.forEach(list => {
                if (list.listcontents && list.listcontents.length > 0) {
                    list.listcontents.forEach(item => {
                        allItems.push(item);
                        if (!listItemMap[list.lid]) {
                            listItemMap[list.lid] = [];
                        }
                        listItemMap[list.lid].push(item.epi);
                    });
                }
            });
            
            // Fetch all items in one batch
            const allEnrichedItems = await SwymWLAsyncApis.fetchProductDataForList(allItems, fromCache);
            
            // Map enriched items back to their respective lists
            const enrichedItemsByEpi = {};
            allEnrichedItems.forEach(item => {
                enrichedItemsByEpi[item.epi] = item;
            });
            
            // Distribute enriched items back to each list - only include items that have valid productData
            const results = lists.map(list => {
                if (list.listcontents && list.listcontents.length > 0) {
                    list.listcontents = list.listcontents
                        .map(item => enrichedItemsByEpi[item.epi])
                        .filter(item => item !== undefined && item.productData); // Only keep items with productData
                }
                return list;
            });
            
            return results.filter((list) => list !== null);
        },
        'init': async function() {

            SwymWLAsyncApis.updateList();

            swat.utils.log('Swym fetch default list - SUCCESS');

        },
        'updateList':async function() {
            let defaultList = null;
            let collections = [];
            let lists = [];

            try{
                // const isMultiListEnabled = swat.retailerSettings?.Wishlist?.EnableCollections;
                const isOldControlCentre = !('multiple-wishlist' in (window?.SwymEnabledCommonFeatures || {}));
                // Determine the boolean condition based on whether it's the old or new control centre
                const isMultiListEnabled = isOldControlCentre
                ? SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection // For old control centre, use this setting
                : window?.SwymEnabledCommonFeatures?.['multiple-wishlist'];

                lists = (await SwymWLAsyncApis.fetchLists()) || [];
                lists = lists?.sort((a, b) =>  a.cts - b.cts);

                lists = await SwymWLAsyncApis.fetchProductDataForLists(lists, SwymStorefrontLayoutContext?.fromCache)

                defaultList = isMultiListEnabled? lists[0] : lists.find((item) => item.lname?.toLowerCase() === SwymWishlistDefaultName?.toLowerCase()) || lists[0];
                
                // Always populate collections (non-default lists), regardless of feature flag
                // This allows users to manage existing lists even when multi-wishlist is disabled
                collections = lists.filter((item) => item.lid !== defaultList?.lid );
                collections?.sort((a, b) =>  b.cts - a.cts);
            }catch(error){
                swat.utils.error(`Error fetching list`, error);
            }

            SwymStorefrontLayoutContext.DefaultList = defaultList;
            SwymStorefrontLayoutContext.collections = collections;
            SwymStorefrontLayoutContext.lists = [
                ...(defaultList != null ? [defaultList] : []),
                ...collections];
            SwymStorefrontLayoutContext.allLists = lists;

            if(SwymStorefrontLayoutContext?.CustomEvents?.WishlistFetched){
                var event = new CustomEvent(SwymStorefrontLayoutContext.CustomEvents.WishlistFetched, {
                    detail: { defaultList, collections, lists }
                });
                document.dispatchEvent(event);
            }else{
                swat.utils.warn(`WishlistFetched event is not defined.`);
            }

            return lists;
        }
    }

    const SwymSFLAsyncApis = {
        'initSFL': async function(){
            return new Promise(async (resolve, reject) => {
                try{
                    swat.api.SaveForLater.init(resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        },
        'addProductToSFL': async function(product, lid){
            return new Promise(async (resolve, reject) => {
                try{
                    swat.api.SaveForLater.add(lid, [product], resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        },
        'removeProductFromSFL': async function(product, lid){
            return new Promise(async (resolve, reject) => {
                try{
                    swat.api.SaveForLater.remove(lid, [product], resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        },
        'fetchSFL': async function(lid){
            return new Promise(async (resolve, reject) => {
                try{
                    swat.api.SaveForLater.fetch(lid, resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        },
        'updateProductInSFL': async function(product, lid){
            return new Promise(async (resolve, reject) => {
                try{
                    // For SFL, we need to remove and re-add with new quantity
                    await SwymSFLAsyncApis.removeProductFromSFL(product, lid);
                    await SwymSFLAsyncApis.addProductToSFL(product, lid);
                    resolve(product);
                }catch(e){
                    reject(e);
                }
            });
        },
        'updateSflList': async function(){
            let sflData = null;
            let sflItems = [];
            try{
                sflData = await SwymSFLAsyncApis.fetchSFL();
                sflItems = await SwymStorefrontLayoutAPI?.SwymWLAsyncApis.fetchProductDataForList(sflData?.items, true);
            }catch(error){
                swat.utils.error(`Error fetching list`, error);
            }
            SwymStorefrontLayoutContext.sflData = sflData;
            SwymStorefrontLayoutContext.sflList = sflData?.list;
            SwymStorefrontLayoutContext.sflListItems = sflItems;
            SwymStorefrontLayoutContext.sflListId = sflData?.list?.lid;

            if(SwymStorefrontLayoutContext?.CustomEvents?.SavedForLaterFetched){
                var event = new CustomEvent(SwymStorefrontLayoutContext.CustomEvents.SavedForLaterFetched, {
                    detail: { sflData }
                });
                document.dispatchEvent(event);
            }else{
                swat.utils.warn(`SavedForLaterFetched event is not defined.`);
            }
        }
    }

    if(SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayout){
        if(swat.retailerSettings.SFL?.SFLFeatureEnabled){
            SwymStorefrontLayoutAPI.SwymSFLAsyncApis = SwymSFLAsyncApis;
        }
        SwymStorefrontLayoutAPI.SwymWLAsyncApis = SwymWLAsyncApis;

        // Fallback for Wishlist UI as section/page
        const components = document.querySelectorAll(`#${SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.Wishlist}`);
        if (components.length === 0) {
            SwymWLAsyncApis.init();
        }

        if (SwymStorefrontLayoutContext?.CustomEvents?.AsyncApisInitialized) {
            const event = new CustomEvent(SwymStorefrontLayoutContext.CustomEvents.AsyncApisInitialized, { detail: { SwymStorefrontLayoutAPI } });
            document.dispatchEvent(event);
        }else {
            swat.utils.warn(`AsyncApisInitialized event is not defined.`);
        }
    }
}

if (!window.SwymCallbacks) {
    window.SwymCallbacks = [];
}
window.SwymCallbacks.push(swymInitWishlistAsyncApi);
})();
