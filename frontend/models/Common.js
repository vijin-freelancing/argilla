/*
 * coding=utf-8
 * Copyright 2021-present, the Recognai S.L. team.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class BaseRecord {
  id;
  metadata;
  prediction;
  annotation;
  status;
  selected;
  event_timestamp;
  constructor({
    id,
    metadata,
    prediction,
    annotation,
    status,
    selected,
    event_timestamp,
    last_updated,
    search_keywords,
  }) {
    this.id = id;
    this.metadata = metadata;
    this.prediction = prediction;
    this.annotation = annotation;
    this.status = status;
    this.selected = selected || false;
    this.event_timestamp = event_timestamp;
    this.last_updated = last_updated;
    this.search_keywords = search_keywords || [];
  }

  recordTitle() {
    throw new Error("Method 'recordTitle()' must be implemented.");
  }
}

class BaseSearchQuery {
  predicted_as;
  annotated_as;
  annotated_by;
  predicted_by;
  status;
  predicted;
  metadata;
  text;
  from;
  limit;

  constructor({
    predicted_as,
    annotated_as,
    annotated_by,
    predicted_by,
    status,
    predicted,
    metadata,
    text,
  }) {
    this.predicted_as = predicted_as;
    this.annotated_as = annotated_as;
    this.annotated_by = annotated_by;
    this.predicted_by = predicted_by;
    this.status = status;
    this.predicted = predicted;
    this.metadata = metadata;
    this.text = text;
  }
}

class BaseSearchResults {
  total;
  records;
  aggregations;

  constructor({ total, records, aggregations }) {
    this.total = total || 0;
    this.records = records;
    this.aggregations = aggregations || {};
  }
}

export { BaseRecord, BaseSearchQuery, BaseSearchResults };
